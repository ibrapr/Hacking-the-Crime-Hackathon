import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserConfigGeneratorPageComponent } from './user-config-generator-page/user-config-generator-page.component';
import { UsrDashBoardComponent } from './usr-dash-board/usr-dash-board.component';


const routes: Routes =  [
  {
    path: '',
    // component: UsrDashBoardComponent,
    // redirectTo: '/dell/tester/userDashBoard',
    children: [
      {
        path: "", 
        redirectTo: "userDashBoard", 
        pathMatch: "full" 
      },
      {
        path:'userDashBoard',
        component: UsrDashBoardComponent,
      },
      {
        path: 'userConfigGenerator',
        component: UserConfigGeneratorPageComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

  
})
export class TesterRoutingModule { }
