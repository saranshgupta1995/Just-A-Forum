import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNoteComponent } from './task-note.component';

describe('TaskNoteComponent', () => {
  let component: TaskNoteComponent;
  let fixture: ComponentFixture<TaskNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskNoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
