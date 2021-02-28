import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSelectionListChange } from '@angular/material/list';
import { Subscription } from 'rxjs';
import { TodoFilterOptionsComponent } from './todo-filter-options/todo-filter-options.component';
import { Todo } from './todo.model';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit, OnDestroy {
  todos: Todo[] = [];
  todosSub!: Subscription;
  bottomSheetSub!: Subscription;
  filter = 'all';

  constructor(private todosService: TodosService, private bottomSheet: MatBottomSheet) { }

  ngOnInit(): void {
    this.todosSub = this.todosService.todos.subscribe(todos => {
      this.todos = todos;
    });
  }

  ngOnDestroy(): void {
    if (this.todosSub) {
      this.todosSub.unsubscribe();
    }

    if (this.bottomSheetSub) {
      this.bottomSheetSub.unsubscribe();
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
    this.bottomSheetSub = this.bottomSheet.open(TodoFilterOptionsComponent).afterDismissed().subscribe(result => {
      if (result) {
        this.filter = result;
      }
    });
  }

  onToggletodo(todo: Todo): void {
    this.todosService.toggleTodo(todo.id).subscribe();
  }
}
