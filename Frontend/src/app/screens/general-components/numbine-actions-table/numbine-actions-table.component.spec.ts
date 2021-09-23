import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineActionsTableComponent } from './numbine-actions-table.component';

describe('NumbineActionsTableComponent', () => {
  let component: NumbineActionsTableComponent;
  let fixture: ComponentFixture<NumbineActionsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineActionsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineActionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
