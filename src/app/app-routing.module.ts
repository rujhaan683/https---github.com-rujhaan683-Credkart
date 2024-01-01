import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DialogComponent } from './dialog/dialog.component';
import { AuthGuard } from './shared/auth.guard';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserSignComponent } from './user-sign/user-sign.component';
const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path:'dashboard',
    canActivate:[AuthGuard],
    component: DashboardComponent
  },
  {
    path:'signup',
    component: UserSignComponent
  }
  ,
  {
    path:'chart',
    component: ChartComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
