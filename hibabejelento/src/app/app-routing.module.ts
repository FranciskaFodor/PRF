import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGardService} from "./services/auth-gard.service";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGardService]},
  {path: 'admin-dashboard', component: AdminDashboardComponent, canActivate: [AuthGardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
