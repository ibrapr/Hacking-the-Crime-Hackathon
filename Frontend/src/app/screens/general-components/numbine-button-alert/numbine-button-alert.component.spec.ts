import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineButtonAlertComponent } from './numbine-button-alert.component';

describe('NumbineButtonAlertComponent', () => {
  let component: NumbineButtonAlertComponent;
  let fixture: ComponentFixture<NumbineButtonAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineButtonAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineButtonAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
