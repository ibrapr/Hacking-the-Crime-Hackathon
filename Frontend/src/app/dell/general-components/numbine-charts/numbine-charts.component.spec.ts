import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineChartsComponent } from './numbine-charts.component';

describe('NumbineChartsComponent', () => {
  let component: NumbineChartsComponent;
  let fixture: ComponentFixture<NumbineChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
