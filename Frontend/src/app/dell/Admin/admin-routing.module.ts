import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserPageComponent } from './pages/add-user-page/add-user-page.component';
import { AccessPageComponent } from './pages/access-page/access-page.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';

import { ChartsLayoutPageComponent } from './pages/charts-layout-page/charts-layout-page.component';
import { ForumPageComponent } from './pages/Forum-page/forum-page/forum-page.component';
import { NumbineAdminDashboardComponent } from './pages/numbine-admin-dashboard/numbine-admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    // redirectTo: '/dell/admin/chartsPage',
    children: [
      {
        path: "", 
        redirectTo: "chartsPage", 
        pathMatch: "full" 
      },
      {
        path: 'accessPage',
        component: AccessPageComponent,
      },
      {
        path: 'addUserPage',
        component: AddUserPageComponent,
      },
      {
        path: 'dashboardPage',
        component: NumbineAdminDashboardComponent,
      },
      {
        path: 'feedbackComponent',
        component: FeedbackComponent,
      },
      {
        path: 'chartsPage',
        component: ChartsLayoutPageComponent,
      },
      {
        path: 'forumPage',
        component: ForumPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
