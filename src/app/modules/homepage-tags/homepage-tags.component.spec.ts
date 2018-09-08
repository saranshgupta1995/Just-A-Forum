import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomepageTagsComponent } from './homepage-tags.component';

describe('HomepageTagsComponent', () => {
  let component: HomepageTagsComponent;
  let fixture: ComponentFixture<HomepageTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomepageTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomepageTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
