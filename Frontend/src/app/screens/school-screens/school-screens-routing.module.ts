import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExplainComponent } from './explain/explain.component';
import { SchoolTableComponent } from './school-table/school-table.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'table',
        component:SchoolTableComponent,
      },
      {
        path: 'explain',
        component:ExplainComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchoolScreensRoutingModule { }
