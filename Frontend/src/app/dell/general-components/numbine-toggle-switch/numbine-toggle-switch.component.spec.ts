import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineToggleSwitchComponent } from './numbine-toggle-switch.component';

describe('NumbineToggleSwitchComponent', () => {
  let component: NumbineToggleSwitchComponent;
  let fixture: ComponentFixture<NumbineToggleSwitchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineToggleSwitchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineToggleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
