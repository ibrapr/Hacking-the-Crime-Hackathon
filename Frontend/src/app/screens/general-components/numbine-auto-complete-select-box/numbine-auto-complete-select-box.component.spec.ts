import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineAutoCompleteSelectBoxComponent } from './numbine-auto-complete-select-box.component';

describe('NumbineAutoCompleteSelectBoxComponent', () => {
  let component: NumbineAutoCompleteSelectBoxComponent;
  let fixture: ComponentFixture<NumbineAutoCompleteSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineAutoCompleteSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineAutoCompleteSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
