import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSelectionListChange } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { TodoFilterOptionsComponent } from './todo-filter-options/todo-filter-options.component';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  user!: User;
  userSub!: Subscription;
  todosSub!: Subscription;
  bottomSheetSub!: Subscription;
  filter = 'all';
  isMobile = false;

  constructor(private todosService: TodosService, private bottomSheet: MatBottomSheet, private authService: AuthService) { }

  ngOnInit(): void {
    this.todosSub = this.todosService.todos.subscribe(todos => {
      this.todos = todos;
    });

    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    });

    this.todosService.fetchTodosFromStorage().subscribe();

    const userAgent = navigator.userAgent.toLowerCase();
    this.isMobile = userAgent.includes('iphone') || userAgent.includes('android');

    window.onbeforeunload = () => {
      this.todosService.storeTodos().subscribe();
    };
  }

  ngOnDestroy(): void {
    if (this.todosSub) {
      this.todosSub.unsubscribe();
    }

    if (this.bottomSheetSub) {
      this.bottomSheetSub.unsubscribe();
    }

    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  onUserTyped(event: KeyboardEvent, form: NgForm): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.onAddTodo(form);
    }
  }

  onAddTodo(form: NgForm): void {
    if (form.valid) {
      const todoId = new Date().getTime().toString();
      const todo = new Todo(todoId, form.value.todo, false);

      this.todosService.addTodo(todo).subscribe(() => { form.reset(); });
    }
  }

  onChangeFilter(): void {
    this.bottomSheetSub = this.bottomSheet.open(TodoFilterOptionsComponent, {
      data: { filter: this.filter }
    }).afterDismissed().subscribe(result => {
      if (result) {
        this.filter = result;
      }
    });
  }

  onToggletodo(todo: Todo): void {
    this.todosService.toggleTodo(todo.id).subscribe();
  }

  onRemoveTodo(todo: Todo): void {
    this.todosService.deleteTodo(todo.id).subscribe();
  }
}
