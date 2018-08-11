import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileQuestionsComponent } from './profile-questions.component';

describe('ProfileQuestionsComponent', () => {
  let component: ProfileQuestionsComponent;
  let fixture: ComponentFixture<ProfileQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
