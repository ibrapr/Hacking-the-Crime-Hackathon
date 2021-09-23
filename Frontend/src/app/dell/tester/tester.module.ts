import { GeneralComponentsModule } from './../general-components/general-components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserConfigGeneratorPageComponent } from './user-config-generator-page/user-config-generator-page.component'
import { TesterRoutingModule } from './tester-routing.module';
import { ConfiguratorModule } from '../configurator/configurator.module';
import { SelectTupleComponent } from './select-tuple/select-tuple.component';
import { ReleaseSelectorComponent } from './release-selector/release-selector.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { UsrDashBoardComponent } from './usr-dash-board/usr-dash-board.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { IgxDateRangePickerModule, IgxInputGroupModule, IgxIconModule } from 'igniteui-angular';

// import { TscFileComponent } from './tsc-file/tsc-file.component';


@NgModule({
  declarations: [
    UserConfigGeneratorPageComponent,
    SelectTupleComponent,
    ReleaseSelectorComponent,
    UsrDashBoardComponent,
    // TscFileComponent
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    TesterRoutingModule,
    GeneralComponentsModule,
    ConfiguratorModule,
    SharedModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
    IgxIconModule
  ],
  exports: [
    UserConfigGeneratorPageComponent,
    SelectTupleComponent,
    ReleaseSelectorComponent
  ]
})
export class TesterModule { }
