import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SexyNavbarComponent } from './sexy-navbar.component';

describe('SexyNavbarComponent', () => {
  let component: SexyNavbarComponent;
  let fixture: ComponentFixture<SexyNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SexyNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SexyNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
