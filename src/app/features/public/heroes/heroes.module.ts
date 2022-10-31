import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesListPage } from './pages/heroes-list/heroes-list.page';
import { HeroItemComponent } from './components/hero-item/hero-item.component';

import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { SpanishPaginatorIntl } from '@core/services/spanish-paginator-intl.service';
import { HeroFormPage } from './pages/hero-form/hero-form.page';
import { SharedModule } from '@sharedshared.module';

const materialModules = [
  MatListModule,
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatPaginatorModule,
];

@NgModule({
  declarations: [HeroesListPage, HeroItemComponent, HeroFormPage],
  imports: [
    CommonModule,
    HeroesRoutingModule,
    ...materialModules,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [{ provide: MatPaginatorIntl, useClass: SpanishPaginatorIntl }],
})
export class HeroesModule {}
