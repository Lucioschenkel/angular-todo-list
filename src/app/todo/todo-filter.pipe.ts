import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from './todo.model';

@Pipe({
  name: 'todoFilter'
})
export class TodoFilterPipe implements PipeTransform {

  transform(todos: Todo[], filter: string): Todo[] {
    switch (filter) {
      case 'all':
        return [...todos];
      case 'done':
        return todos.filter(todo => todo.done);
      case 'todo':
        return todos.filter(todo => !todo.done);
      default:
        return [];
    }
  }

}
