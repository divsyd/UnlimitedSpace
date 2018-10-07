import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserphotoComponent } from './userphoto.component';

describe('UserphotoComponent', () => {
  let component: UserphotoComponent;
  let fixture: ComponentFixture<UserphotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserphotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserphotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
