import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguratorProductsPageComponent } from './configurator-products-page.component';

describe('ConfiguratorProductsPageComponent', () => {
  let component: ConfiguratorProductsPageComponent;
  let fixture: ComponentFixture<ConfiguratorProductsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfiguratorProductsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfiguratorProductsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
