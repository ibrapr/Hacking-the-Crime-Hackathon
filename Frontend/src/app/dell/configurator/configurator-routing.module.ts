import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewParamMappingComponent } from './pages/new-param-mapping/new-param-mapping.component';
import { NewReleaseComponent } from './pages/new-release/new-release.component';
import { ProductReleaseMappingComponent } from './pages/product-release-mapping/product-release-mapping.component';
import { ReleasesComponent } from './pages/releases/releases.component';
import { TestConfigrationsEditNewComponent } from './pages/test-configrations-edit-new/test-configrations-edit-new.component';
import { TestConfigurationComponent } from './pages/test-configuration/test-configuration.component';
import {ConfiguratorProductsPageComponent} from './pages/configurator-products-page/configurator-products-page.component'
import {ConfiguratorProductsPageAddComponent} from './pages/configurator-products-page-add/configurator-products-page-add.component'
import { UserMappingComponent } from './pages/user-mapping/user-mapping.component';
import { EditProductComponent } from './pages/edit-product/edit-product.component';
import { DashboardconfigComponent } from './pages/dashboardconfig/dashboardconfig.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/dell/config/products',
    children: [
      {
        path: "", 
        redirectTo: "dashboardconfig", 
        pathMatch: "full" 
      },
      {
        path: 'dashboardconfig',
        component: DashboardconfigComponent
      },
      {
        path: 'newParamMapping',
        component: NewParamMappingComponent
      },
      {
        path: 'newRelease',
        component: NewReleaseComponent
      },
      {
        path: 'ConfigProductsPage',
        component: ConfiguratorProductsPageComponent
      },
      {
        path: 'ConfigProductsPageAdd',
        component: ConfiguratorProductsPageAddComponent
      },
      {
        path: 'newRelease;update=true',
        component: NewReleaseComponent
      },
      {
        path: 'productReleaseMapping',
        component: ProductReleaseMappingComponent
      }, 
      {
        path: 'products',
        component: ConfiguratorProductsPageComponent
      },
      {
        path: 'releases',
        component: ReleasesComponent
      },
      {
        path: 'testConfigrationsEditNew',
        component: TestConfigrationsEditNewComponent
      },
      {
        path: 'testConfiguration',
        component: TestConfigurationComponent
      },
      {
        path: 'userMapping',
        component: UserMappingComponent
      },
      {
        path: 'editProduct',
        component: EditProductComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguratorRoutingModule { }
