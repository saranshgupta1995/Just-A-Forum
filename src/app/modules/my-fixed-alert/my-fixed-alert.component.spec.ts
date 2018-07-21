import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFixedAlertComponent } from './my-fixed-alert.component';

describe('MyFixedAlertComponent', () => {
  let component: MyFixedAlertComponent;
  let fixture: ComponentFixture<MyFixedAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyFixedAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFixedAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
