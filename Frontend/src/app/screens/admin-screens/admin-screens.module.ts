import { SharedModule } from './../../theme/shared/shared.module';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminScreensRoutingModule } from './admin-screens-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AdminScreensRoutingModule,
    SharedModule
  ]
})
export class AdminScreensModule { }
