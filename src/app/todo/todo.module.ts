import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
import { FormsModule } from '@angular/forms';
import { TodoFilterOptionsComponent } from './todo-filter-options/todo-filter-options.component';
import { TodoFilterPipe } from './todo-filter.pipe';

@NgModule({
  declarations: [TodoComponent, TodoFilterOptionsComponent, TodoFilterPipe],
  imports: [
    CommonModule,
    FormsModule,
    TodoRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatCheckboxModule,
    MatBottomSheetModule,
  ]
})
export class TodoModule { }
