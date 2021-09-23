import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsrDashBoardComponent } from './usr-dash-board.component';

describe('UsrDashBoardComponent', () => {
  let component: UsrDashBoardComponent;
  let fixture: ComponentFixture<UsrDashBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrDashBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsrDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
