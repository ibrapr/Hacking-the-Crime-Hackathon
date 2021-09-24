import { SharedModule } from './../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolScreensRoutingModule } from './school-screens-routing.module';
import { SchoolTableComponent } from './school-table/school-table.component';
import { GeneralComponentsModule } from '../general-components/general-components.module';


@NgModule({
  declarations: [SchoolTableComponent],
  imports: [
    GeneralComponentsModule,
    CommonModule,
    SchoolScreensRoutingModule,
    SharedModule
  ],
  exports:[SchoolTableComponent]
})
export class SchoolScreensModule { }
