import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineTableComponent } from './numbine-table.component';

describe('NumbineTableComponent', () => {
  let component: NumbineTableComponent;
  let fixture: ComponentFixture<NumbineTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
