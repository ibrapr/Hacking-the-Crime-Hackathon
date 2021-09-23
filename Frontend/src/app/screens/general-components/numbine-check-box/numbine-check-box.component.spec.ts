import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineCheckBoxComponent } from './numbine-check-box.component';

describe('NumbineCheckBoxComponent', () => {
  let component: NumbineCheckBoxComponent;
  let fixture: ComponentFixture<NumbineCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
