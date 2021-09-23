import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineActionAlertComponent } from './numbine-action-alert.component';

describe('NumbineActionAlertComponent', () => {
  let component: NumbineActionAlertComponent;
  let fixture: ComponentFixture<NumbineActionAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineActionAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineActionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
