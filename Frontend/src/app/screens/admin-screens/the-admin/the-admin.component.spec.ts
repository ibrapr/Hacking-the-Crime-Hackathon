import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheAdminComponent } from './the-admin.component';

describe('TheAdminComponent', () => {
  let component: TheAdminComponent;
  let fixture: ComponentFixture<TheAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
