import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './screens/not-found/not-found.component'
import { NumbineLayComponent } from './demo/numbine-layout/numbine-lay/numbine-lay.component';
import { LogInComponent } from './screens/generalScreens/log-in/log-in.component'
import { ForgotPassComponent } from './screens/generalScreens/log-in/forgot-pass/forgot-pass.component'

const routes: Routes = [
  {
    path: '',
    component: NumbineLayComponent,
    children: [
      {
        path: '',
        redirectTo: 'dell/admin',
        pathMatch: 'full'
      },
      // {
      //   path: 'dell/admin',
      //   canActivate: [
      //     AdminPermissionGuardService
      //   ],
      //   loadChildren: () => import('./dell/admin/admin.module').then(module => module.AdminModule)
      // },
      {
        path: 'dell',
        component: NotFoundComponent
      },
    ]
  },
  {
    path: 'login',
    component: LogInComponent
  },
  {
    path: 'forgotPass',
    component: ForgotPassComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
