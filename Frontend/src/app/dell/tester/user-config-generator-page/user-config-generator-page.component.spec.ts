import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConfigGeneratorPageComponent } from './user-config-generator-page.component';

describe('UserConfigGeneratorPageComponent', () => {
  let component: UserConfigGeneratorPageComponent;
  let fixture: ComponentFixture<UserConfigGeneratorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConfigGeneratorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConfigGeneratorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
