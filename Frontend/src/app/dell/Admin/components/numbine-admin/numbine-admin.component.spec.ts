import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NumbineAdminComponent } from './numbine-admin.component';

describe('AdminComponent', () => {
  let component: NumbineAdminComponent;
  let fixture: ComponentFixture<NumbineAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NumbineAdminComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbineAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
