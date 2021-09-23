import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTupleComponent } from './select-tuple.component';

describe('SelectTupleComponent', () => {
  let component: SelectTupleComponent;
  let fixture: ComponentFixture<SelectTupleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTupleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTupleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
