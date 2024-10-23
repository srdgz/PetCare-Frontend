import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './dashboard/pages/user-profile/user-profile.component';
import { ErrorPageComponent } from './dashboard/pages/error-page/error-page.component';
import { HomeComponent } from './dashboard/pages/home/home.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'user-profile', component: UserProfileComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: ErrorPageComponent },
    ],
  },
];
