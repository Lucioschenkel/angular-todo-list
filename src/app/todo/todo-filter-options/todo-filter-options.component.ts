import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-todo-filter-options',
  templateUrl: './todo-filter-options.component.html',
  styleUrls: ['./todo-filter-options.component.scss']
})
export class TodoFilterOptionsComponent implements OnInit {

  constructor(private _bottomSheetRef: MatBottomSheetRef) { }

  ngOnInit(): void {
  }

  dismiss(event: MouseEvent, option: string): void {
    this._bottomSheetRef.dismiss(option);
    event.preventDefault();
  }
}
