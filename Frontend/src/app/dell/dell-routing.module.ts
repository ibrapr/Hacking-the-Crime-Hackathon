import { DellModule } from './dell.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesterComponent } from './tester/tester.component'
const routes: Routes = [
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DellRoutingModule { }
