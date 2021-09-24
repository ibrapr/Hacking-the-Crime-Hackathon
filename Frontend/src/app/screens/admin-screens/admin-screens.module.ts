import { SharedModule } from './../../theme/shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminScreensRoutingModule } from './admin-screens-routing.module';
import { TheAdminComponent } from './the-admin/the-admin.component';
import { GeneralComponentsModule } from '../general-components/general-components.module';


@NgModule({
  declarations: [TheAdminComponent],
  imports: [
    CommonModule,
    AdminScreensRoutingModule,
    SharedModule,
    GeneralComponentsModule
  ],
  exports:[TheAdminComponent]
})
export class AdminScreensModule { }
