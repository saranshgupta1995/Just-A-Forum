import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePrivilegesComponent } from './profile-privileges.component';

describe('ProfilePrivilegesComponent', () => {
  let component: ProfilePrivilegesComponent;
  let fixture: ComponentFixture<ProfilePrivilegesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePrivilegesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePrivilegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
