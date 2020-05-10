import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { SignupComponent } from './page/signup/signup.component';
import { ListComponent } from './page/list/list.component';
import { MainComponent } from './page/main/main.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { AuthGuard } from './guard/auth.guard';
import { DetailComponent } from './page/detail/detail.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'petlist', component: PetlistComponent },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'signup',
    component: SignupComponent,
    pathMatch: 'full'
  },
  {
    path: 'main',
    component: MainComponent,
    canActivateChild: [AuthGuard], 
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'detail',
        component: DetailComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
