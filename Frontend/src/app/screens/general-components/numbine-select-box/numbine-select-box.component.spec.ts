import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineSelectBoxComponent } from './numbine-select-box.component';

describe('NumbineSelectBoxComponent', () => {
  let component: NumbineSelectBoxComponent;
  let fixture: ComponentFixture<NumbineSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
