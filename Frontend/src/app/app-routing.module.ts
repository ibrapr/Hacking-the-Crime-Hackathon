import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { NotFoundComponent } from './dell/not-found/not-found.component'
import { NumbineLayComponent } from './demo/numbine-layout/numbine-lay/numbine-lay.component';
import { UserPermissionGuardService } from './user-permission-guard.service'
import { ConfigPermissionGuardService } from './config-permission-guard.service'
import { AdminPermissionGuardService } from './admin-permission-guard.service'
import { LogInComponent } from './dell/generalScreens/log-in/log-in.component'
import { ForgotPassComponent } from './dell/generalScreens/log-in/forgot-pass/forgot-pass.component'

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
      {
        path: 'dell/admin',
        canActivate: [
          AdminPermissionGuardService
        ],
        loadChildren: () => import('./dell/admin/admin.module').then(module => module.AdminModule)
      },
      {
        path: 'dell/config',
        canActivate: [
          ConfigPermissionGuardService
        ],
        loadChildren: () => import('./dell/configurator/configurator.module').then(module => module.ConfiguratorModule)
      },
      {
        path: 'dell/tester',
        canActivate: [
          UserPermissionGuardService
        ],
        loadChildren: () => import('./dell/tester/tester.module').then(module => module.TesterModule)
      },
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
