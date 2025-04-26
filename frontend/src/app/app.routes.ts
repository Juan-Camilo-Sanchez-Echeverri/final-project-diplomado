import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CreateToyComponent } from './create-toy/create-toy.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-toy',
    component: CreateToyComponent,
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
