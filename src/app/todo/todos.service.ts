import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private _todos = new BehaviorSubject<Todo[]>([]);

  get todos(): Observable<Todo[]> {
    return this._todos.asObservable();
  }

  constructor(private authService: AuthService) {}

  addTodo(todo: Todo): Observable<Todo[]> {
    return this.todos
      .pipe(
        take(1),
        tap(todos => {
          this._todos.next([...todos, { ...todo }]);
        })
      );
  }

  fetchTodosFromStorage(): Observable<User> {
    return this.authService.user.pipe(
      take(1),
      tap(
        user => {
          const todos = window.localStorage.getItem(user.name as string);

          if (todos) {
            this._todos.next(JSON.parse(todos));
          }
        }
      )
    );
  }

  toggleTodo(todoId: string): Observable<Todo[]> {
    return this.todos
      .pipe(
        take(1),
        tap(
          todos => {
            this._todos.next(
              todos.map(
                todo => ({
                  ...todo,
                  done: todo.id === todoId ? !todo.done : todo.done
                })
              )
            );
          }
        )
      );
  }

  deleteTodo(todoId: string): Observable<Todo[]> {
    return this.todos
      .pipe(
        take(1),
        tap(
          todos => {
            this._todos.next(todos.filter(todo => todo.id !== todoId));
          }
        )
      );
  }

  storeTodos(): Observable<Todo[]> {
    let currentUser: User;
    return this.authService.user.pipe(
      take(1),
      switchMap(
        user => {
          currentUser = user;
          return this.todos;
        }
      ),
      take(1),
      tap(
        todos => {
          const stringTodos = JSON.stringify(todos);
          window.localStorage.setItem(currentUser.name as string, stringTodos);
        }
      )
    );
  }
}
