import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineAdminDashboardComponent } from './numbine-admin-dashboard.component';

describe('NumbineAdminDashboardComponent', () => {
  let component: NumbineAdminDashboardComponent;
  let fixture: ComponentFixture<NumbineAdminDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NumbineAdminDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
