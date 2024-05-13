import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { inject } from '@angular/core';
import { UsersService } from './services/users.service';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { initialData: () => inject(UsersService).getUsers() },
  },
];
