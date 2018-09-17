import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFatTextComponent } from './big-fat-text.component';

describe('BigFatTextComponent', () => {
  let component: BigFatTextComponent;
  let fixture: ComponentFixture<BigFatTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BigFatTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigFatTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
