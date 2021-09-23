import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductReleaseMappingComponent } from './product-release-mapping.component';

describe('ProductReleaseMappingComponent', () => {
  let component: ProductReleaseMappingComponent;
  let fixture: ComponentFixture<ProductReleaseMappingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductReleaseMappingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductReleaseMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
