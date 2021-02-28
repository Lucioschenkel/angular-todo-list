import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

import { Todo } from './todo.model';

@Injectable({ providedIn: 'root' })
export class TodosService {
  private _todos = new BehaviorSubject<Todo[]>([]);

  get todos(): Observable<Todo[]> {
    return this._todos.asObservable();
  }

  addTodo(todo: Todo): Observable<Todo[]> {
    return this.todos
      .pipe(
        take(1),
        tap(todos => {
          this._todos.next([...todos, { ...todo }]);
        })
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
}
