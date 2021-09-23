import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralComponentsRoutingModule } from './general-components-routing.module';
import { ButtonComponent } from './button/button.component';
import { TestComponent } from './test/test.component';
import { InputComponent } from './input/input.component';
import { IconComponent } from './icon/icon.component';
import { NumbineChartsComponent } from './numbine-charts/numbine-charts.component';
import { NumbineSelectBoxComponent } from './numbine-select-box/numbine-select-box.component';
import { NumbineButtonAlertComponent } from './numbine-button-alert/numbine-button-alert.component';
import { NumbineCheckBoxComponent } from './numbine-check-box/numbine-check-box.component';
import { NumbineTableComponent } from './numbine-table/numbine-table.component';
import { NumbineActionsTableComponent } from './numbine-actions-table/numbine-actions-table.component'
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NumbineActionAlertComponent } from './numbine-action-alert/numbine-action-alert.component';
import { NumbineAutoCompleteSelectBoxComponent } from './numbine-auto-complete-select-box/numbine-auto-complete-select-box.component';
import { NumbineTableSortPipePipe } from './numbine-actions-table/numbine-table-sort-pipe.pipe';
import { NumbineToggleSwitchComponent } from './numbine-toggle-switch/numbine-toggle-switch.component'
import { AppLoadingComponent } from './app-loading/app-loading.component';
import { NumbineBarChartComponent } from './numbine-bar-chart/numbine-bar-chart.component';
import { NumbineLineChartComponent } from './numbine-line-chart/numbine-line-chart.component';
import { NumbinePieChartComponent } from './numbine-pie-chart/numbine-pie-chart.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		AppLoadingComponent,
		ButtonComponent,
		TestComponent,
		InputComponent,
		IconComponent,
		NumbineChartsComponent,
		NumbineSelectBoxComponent,
		NumbineButtonAlertComponent,
		NumbineCheckBoxComponent,
		NumbineTableComponent,
		NumbineActionsTableComponent,
		NumbineAutoCompleteSelectBoxComponent,
		NumbineActionAlertComponent,
		NumbineTableSortPipePipe,
		NumbineToggleSwitchComponent,
		NumbineBarChartComponent,
		NumbineLineChartComponent,
		NumbinePieChartComponent,
		NumbineToggleSwitchComponent
	],
	imports: [
		NgbModule,
		NgSelectModule,
		CommonModule,
		GeneralComponentsRoutingModule,
		SharedModule
	],
	exports: [
		AppLoadingComponent,
		ButtonComponent,
		TestComponent,
		InputComponent,
		IconComponent,
		NumbineChartsComponent,
		NumbineSelectBoxComponent,
		NumbineButtonAlertComponent,
		NumbineCheckBoxComponent,
		NumbineTableComponent,
		NumbineActionsTableComponent,
		NumbineAutoCompleteSelectBoxComponent,
		NumbineActionAlertComponent,
		NumbineTableSortPipePipe,
		NumbineToggleSwitchComponent,
		NumbineBarChartComponent,
		NumbineLineChartComponent,
		NumbinePieChartComponent,
	],
})
export class GeneralComponentsModule { }
