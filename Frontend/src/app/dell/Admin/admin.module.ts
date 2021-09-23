import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumbineAdminComponent } from './components/numbine-admin/numbine-admin.component'
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component'
import { AccessPageComponent } from './pages/access-page/access-page.component'
import { AdminRoutingModule } from './admin-routing.module';
import { GeneralComponentsModule } from '../general-components/general-components.module';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { TesterModule } from '../tester/tester.module';
import { ConfiguratorModule } from './../configurator/configurator.module'
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { ChartsLayoutPageComponent } from './pages/charts-layout-page/charts-layout-page.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { IgxDateRangePickerModule, IgxInputGroupModule, IgxIconModule } from 'igniteui-angular';
import { ForumPageComponent } from './pages/Forum-page/forum-page/forum-page.component';
import { NumbineAdminDashboardComponent } from './pages/numbine-admin-dashboard/numbine-admin-dashboard.component';

@NgModule({
  declarations: [
    NumbineAdminComponent,
    AddUserPageComponent,
    AccessPageComponent,
    FeedbackComponent, 
    ChartsLayoutPageComponent,
    ForumPageComponent, 
    NumbineAdminDashboardComponent

  ],
  imports: [
    GeneralComponentsModule,
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    TesterModule,
    ConfiguratorModule,
    NgbCarouselModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
    IgxIconModule
  ],
  exports: [
    NumbineAdminComponent,
    AddUserPageComponent,
    AccessPageComponent,
    FeedbackComponent,
    ForumPageComponent,
    NumbineAdminDashboardComponent,
    AccessPageComponent
  ],
  schemas: []
})
export class AdminModule { }
