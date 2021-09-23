import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineLineChartComponent } from './numbine-line-chart.component';

describe('NumbineLineChartComponent', () => {
  let component: NumbineLineChartComponent;
  let fixture: ComponentFixture<NumbineLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
