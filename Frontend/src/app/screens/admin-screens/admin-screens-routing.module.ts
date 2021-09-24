import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TheAdminComponent } from './the-admin/the-admin.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'table',
        component:TheAdminComponent,
      },
    ]
  }
];
// 'stop/admin/table'
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminScreensRoutingModule { }
