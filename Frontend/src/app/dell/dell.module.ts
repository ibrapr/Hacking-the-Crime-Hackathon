import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DellRoutingModule } from './dell-routing.module';
import { GeneralComponentsModule } from './general-components/general-components.module';
import { ConfiguratorModule } from './configurator/configurator.module'
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { TesterModule } from './tester/tester.module';
import { BreadcrumbModule } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.module';
import { LogInComponent } from './generalScreens/log-in/log-in.component';
import { ForgotPassComponent } from './generalScreens/log-in/forgot-pass/forgot-pass.component';
// import { TscFileComponent } from './models/tsc-file/tsc-file.component';
@NgModule({
declarations: [NotFoundComponent, LogInComponent,ForgotPassComponent/*, TscFileComponent*/],
  imports: [
    BreadcrumbModule,
    AppRoutingModule,
    CommonModule,
    DellRoutingModule,
    GeneralComponentsModule,
    AdminModule,
    ConfiguratorModule,
    TesterModule,
    NgSelectModule
  ],
})
export class DellModule { }
