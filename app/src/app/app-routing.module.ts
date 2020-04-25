import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShellComponent } from './components/shell/shell.component';

import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './login/login.module#LoginPageModule'
  },
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contact',
        loadChildren: './contact/contact.module#ContactPageModule',
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
