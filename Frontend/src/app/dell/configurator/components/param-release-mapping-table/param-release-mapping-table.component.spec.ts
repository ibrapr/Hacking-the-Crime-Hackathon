import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParamReleaseMappingTableComponent } from './param-release-mapping-table.component';

describe('ParamReleaseMappingTableComponent', () => {
  let component: ParamReleaseMappingTableComponent;
  let fixture: ComponentFixture<ParamReleaseMappingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParamReleaseMappingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParamReleaseMappingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
