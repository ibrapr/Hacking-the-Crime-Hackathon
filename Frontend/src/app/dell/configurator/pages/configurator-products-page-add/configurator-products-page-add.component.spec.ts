import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorProductsPageAddComponent } from './configurator-products-page-add.component';

describe('ConfiguratorProductsPageAddComponent', () => {
  let component: ConfiguratorProductsPageAddComponent;
  let fixture: ComponentFixture<ConfiguratorProductsPageAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguratorProductsPageAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorProductsPageAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
