import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineBarChartComponent } from './numbine-bar-chart.component';

describe('NumbineBarChartComponent', () => {
  let component: NumbineBarChartComponent;
  let fixture: ComponentFixture<NumbineBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
