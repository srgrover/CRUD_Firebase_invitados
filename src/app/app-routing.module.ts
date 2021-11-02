import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'edit',
    loadChildren: () =>
      import('./pages/edit/edit.module').then((m) => m.EditModule),
  },
  { path: 'new', loadChildren: () => import('./pages/new/new.module').then(m => m.NewModule) },
  { path: 'edit', loadChildren: () => import('./pages/edit/edit.module').then(m => m.EditModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
