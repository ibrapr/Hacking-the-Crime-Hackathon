import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DellRoutingModule } from './dell-routing.module';
import { GeneralComponentsModule } from './general-components/general-components.module';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NotFoundComponent } from './not-found/not-found.component';
import { BreadcrumbModule } from 'src/app/theme/shared/components/breadcrumb/breadcrumb.module';
import { LogInComponent } from './generalScreens/log-in/log-in.component';
import { ForgotPassComponent } from './generalScreens/log-in/forgot-pass/forgot-pass.component';
@NgModule({
declarations: [NotFoundComponent, LogInComponent,ForgotPassComponent/*, TscFileComponent*/],
  imports: [
    BreadcrumbModule,
    AppRoutingModule,
    CommonModule,
    DellRoutingModule,
    GeneralComponentsModule,
    NgSelectModule
  ],
})
export class DellModule { }
