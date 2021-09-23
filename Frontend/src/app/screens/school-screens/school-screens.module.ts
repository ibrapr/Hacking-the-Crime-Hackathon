import { SharedModule } from './../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolScreensRoutingModule } from './school-screens-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SchoolScreensRoutingModule,
    SharedModule
  ]
})
export class SchoolScreensModule { }
