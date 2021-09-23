import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfiguratorRoutingModule } from './configurator-routing.module';
import { ParamSelectorComponent } from './components/param-selector/param-selector.component';
import { ProductSelectorComponent } from './components/product-selector/product-selector.component';
import { TestConfigrationsEditNewComponent } from './pages/test-configrations-edit-new/test-configrations-edit-new.component'
import { ReleasesComponent } from './pages/releases/releases.component'
import { ProductReleaseMappingComponent } from './pages/product-release-mapping/product-release-mapping.component'
import { NewReleaseComponent } from './pages/new-release/new-release.component'
import { TestConfigurationComponent } from './pages/test-configuration/test-configuration.component'
import { NewParamMappingComponent } from './pages/new-param-mapping/new-param-mapping.component'
import { GeneralComponentsModule } from '../general-components/general-components.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfiguratorProductsPageComponent } from './pages/configurator-products-page/configurator-products-page.component';
import { ConfiguratorProductsPageAddComponent } from './pages/configurator-products-page-add/configurator-products-page-add.component';
import { UserMappingComponent } from './pages/user-mapping/user-mapping.component';
import { UserSelectorComponent } from './components/user-selector/user-selector.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { ParamReleaseMappingTableComponent } from './components/param-release-mapping-table/param-release-mapping-table.component';
import { DashboardconfigComponent } from './pages/dashboardconfig/dashboardconfig.component';
@NgModule({
  declarations: [
    ParamSelectorComponent,
    ProductSelectorComponent,
    TestConfigurationComponent,
    TestConfigrationsEditNewComponent,
    ReleasesComponent,
    ProductReleaseMappingComponent,
    NewReleaseComponent,
    NewParamMappingComponent,
    ConfiguratorProductsPageComponent,
    ConfiguratorProductsPageAddComponent,
    UserMappingComponent,
    UserSelectorComponent,
    EditProductComponent,
    ParamReleaseMappingTableComponent,
    DashboardconfigComponent
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    ConfiguratorRoutingModule,
    SharedModule,
    GeneralComponentsModule
  ],
  exports: [
    ParamSelectorComponent,
    ProductSelectorComponent,
    TestConfigurationComponent,
    TestConfigrationsEditNewComponent,
    ReleasesComponent,
    ProductReleaseMappingComponent,
    NewReleaseComponent,
    NewParamMappingComponent,
    ConfiguratorProductsPageComponent,
    ConfiguratorProductsPageAddComponent
  ]
})
export class ConfiguratorModule { }
