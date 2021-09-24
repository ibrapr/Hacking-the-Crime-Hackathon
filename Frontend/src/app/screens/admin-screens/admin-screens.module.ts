import { SharedModule } from './../../theme/shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminScreensRoutingModule } from './admin-screens-routing.module';
import { TheAdminComponent } from './the-admin/the-admin.component';


@NgModule({
  declarations: [TheAdminComponent],
  imports: [
    CommonModule,
    AdminScreensRoutingModule,
    SharedModule
  ]
})
export class AdminScreensModule { }
