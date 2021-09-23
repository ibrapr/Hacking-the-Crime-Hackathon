import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParamMappingComponent } from './new-param-mapping.component';

describe('NewParamMappingComponent', () => {
  let component: NewParamMappingComponent;
  let fixture: ComponentFixture<NewParamMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewParamMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewParamMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
