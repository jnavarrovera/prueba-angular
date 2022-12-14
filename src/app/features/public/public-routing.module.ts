import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      // {
      //   path: 'auth',
      //   loadChildren: () =>
      //     import('./auth/auth.module').then((m) => m.AuthModule),
      // },
      {
        path: 'heroes',
        loadChildren: () =>
          import('./heroes/heroes.module').then((m) => m.HeroesModule),
      },
      { path: '', redirectTo: 'heroes', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
