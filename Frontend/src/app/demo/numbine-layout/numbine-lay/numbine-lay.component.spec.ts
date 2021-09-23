import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineLayComponent } from './numbine-lay.component';

describe('NumbineLayComponent', () => {
  let component: NumbineLayComponent;
  let fixture: ComponentFixture<NumbineLayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineLayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineLayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
