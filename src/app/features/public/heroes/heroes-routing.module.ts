import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageTitleResolver } from '@core/strategies/page-title.resolver';
import { HeroFormPage } from './pages/hero-form/hero-form.page';
import { HeroesListPage } from './pages/heroes-list/heroes-list.page';

const routes: Routes = [
  {
    path: '',
    component: HeroesListPage,
    title: PageTitleResolver,
  },
  {
    path: 'new',
    component: HeroFormPage,
    title: PageTitleResolver,
  },
  {
    path: 'edit/:id',
    component: HeroFormPage,
    title: PageTitleResolver,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
