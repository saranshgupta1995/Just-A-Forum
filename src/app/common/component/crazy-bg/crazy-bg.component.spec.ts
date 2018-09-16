import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrazyBgComponent } from './crazy-bg.component';

describe('CrazyBgComponent', () => {
  let component: CrazyBgComponent;
  let fixture: ComponentFixture<CrazyBgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrazyBgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrazyBgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
