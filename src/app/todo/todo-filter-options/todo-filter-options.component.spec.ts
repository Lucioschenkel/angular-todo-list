import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFilterOptionsComponent } from './todo-filter-options.component';

describe('TodoFilterOptionsComponent', () => {
  let component: TodoFilterOptionsComponent;
  let fixture: ComponentFixture<TodoFilterOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoFilterOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoFilterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
