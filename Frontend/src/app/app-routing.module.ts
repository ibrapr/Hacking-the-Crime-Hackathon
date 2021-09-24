import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './screens/not-found/not-found.component'
import { NumbineLayComponent } from './demo/numbine-layout/numbine-lay/numbine-lay.component';
import { LogInComponent } from './screens/generalScreens/log-in/log-in.component'
import { ForgotPassComponent } from './screens/generalScreens/log-in/forgot-pass/forgot-pass.component'

const routes: Routes = [
  {
    path: 'stop',
    component: NumbineLayComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => import('./screens/admin-screens/admin-screens.module').then(module => module.AdminScreensModule)
      },
      {
        path: 'school',
        loadChildren: () => import('./screens/school-screens/school-screens.module').then(module => module.SchoolScreensModule)
      },
      {
        path: '**',
        component: NotFoundComponent
      },
    ]
  },
  { 
    path: '',
    redirectTo: 'stop/school/table',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LogInComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
