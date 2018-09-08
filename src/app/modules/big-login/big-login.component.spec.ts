import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigLoginComponent } from './big-login.component';

describe('BigLoginComponent', () => {
  let component: BigLoginComponent;
  let fixture: ComponentFixture<BigLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
