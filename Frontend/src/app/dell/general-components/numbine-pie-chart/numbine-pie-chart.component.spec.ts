import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbinePieChartComponent } from './numbine-pie-chart.component';

describe('NumbinePieChartComponent', () => {
  let component: NumbinePieChartComponent;
  let fixture: ComponentFixture<NumbinePieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbinePieChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbinePieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
