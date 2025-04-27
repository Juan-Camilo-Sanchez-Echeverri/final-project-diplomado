import { Routes } from '@angular/router';

import { AdminGuard } from './guards/admin.guard';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { CreateToyComponent } from './components/toy/create-toy/create-toy.component';
import { AdminComponent } from './pages/admin/admin.component';
import { EditToyComponent } from './components/toy/edit-toy/edit-toy.component';
import { UploadImagesComponent } from './components/toy/upload-images/upload-images.component';
import { EditImagesComponent } from './components/toy/edit-images/edit-images.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'create-toy',
    component: CreateToyComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-toy/:id',
    component: EditToyComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'upload-images/:id',
    component: UploadImagesComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'edit-images/:id',
    component: EditImagesComponent,
    canActivate: [AdminGuard],
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
