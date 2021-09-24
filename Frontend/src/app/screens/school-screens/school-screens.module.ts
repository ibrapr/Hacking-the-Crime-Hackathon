import { SharedModule } from './../../theme/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchoolScreensRoutingModule } from './school-screens-routing.module';
import { SchoolTableComponent } from './school-table/school-table.component';
import { GeneralComponentsModule } from '../general-components/general-components.module';
import { ExplainComponent } from './explain/explain.component';


@NgModule({
  declarations: [SchoolTableComponent, ExplainComponent],
  imports: [
    GeneralComponentsModule,
    CommonModule,
    SchoolScreensRoutingModule,
    SharedModule
  ],
  exports:[SchoolTableComponent, ExplainComponent]
})
export class SchoolScreensModule { }
