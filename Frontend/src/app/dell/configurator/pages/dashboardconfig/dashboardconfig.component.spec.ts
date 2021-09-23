import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardconfigComponent } from './dashboardconfig.component';

describe('DashboardconfigComponent', () => {
  let component: DashboardconfigComponent;
  let fixture: ComponentFixture<DashboardconfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardconfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
