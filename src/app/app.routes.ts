import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { inject } from '@angular/core';
import { UsersService } from './services/users.service';
import { DetailsUserComponent } from './components/details-user/details-user.component';
import { userResolver } from './components/details-user/user.resolver';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    resolve: { initialData: () => inject(UsersService).getUsers() },
  },
  {
    path: ':id',
    component: DetailsUserComponent,
    resolve: { user: userResolver },
  },
];
