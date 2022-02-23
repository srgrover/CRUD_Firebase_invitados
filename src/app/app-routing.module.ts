import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
    ...canActivate(redirectLoggedInToHome),
  },

  {
    path: 'register',
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
    ...canActivate(redirectLoggedInToHome),
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },

  {
    path: 'new',
    loadChildren: () =>
      import('./pages/new/new.module').then((m) => m.NewModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },

  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/edit/edit.module').then((m) => m.EditModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },

  {
    path: 'profile',
    loadChildren: () =>
      import('./pages/profile/profile.module').then((m) => m.ProfileModule),
      ...canActivate(redirectUnauthorizedToLogin),
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
