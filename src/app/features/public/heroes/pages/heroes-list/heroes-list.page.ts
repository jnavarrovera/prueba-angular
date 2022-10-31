import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { PATHS } from '@core/constants/paths.constants';
import { ActionEvent } from '@core/interfaces/action-event.interface';
import { Pagination } from '@core/interfaces/pagination.interface';
import { ConfirmationNotification } from '@core/models/confirmation-notification.model';
import { ControlatedError } from '@core/models/controlated-error.model';
import { Hero } from '@core/models/hero.model';
import { NotificationHubService } from '@core/services/notification-hub.service';
import { HeroFacadeService } from '../../services/hero-facade.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes-list.page.html',
  styleUrls: ['./heroes-list.page.scss'],
})
export class HeroesListPage implements OnInit {
  searchName: string = '';
  pagination: Pagination = { total: 0, per_page: 10, current_page: 1 };

  constructor(
    protected facade: HeroFacadeService,
    private _notifications: NotificationHubService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.facade.pagination$.subscribe(
      (pagination) => (this.pagination = pagination)
    );
    this.facade.loadHeroes();
  }

  search() {
    if (this.searchName.length > 3 || this.searchName === '') {
      this.facade.loadHeroes({ name: this.searchName });
    }
  }

  changePage(pageEvent: PageEvent) {
    this.pagination.current_page = pageEvent.pageIndex + 1;
    this.pagination.per_page = pageEvent.pageSize;
    this.pagination.total = pageEvent.length;
    this.facade.loadHeroes({ name: this.searchName, ...this.pagination });
  }

  onItemAction(event: ActionEvent<Hero>) {
    switch (event.action) {
      case 'delete':
        const confirmation = new ConfirmationNotification({
          title: 'Confirmar eliminación',
          msg: '¿Seguro que quiere eliminar este héroe?',
          fnYes: () => {
            if (event.payload) {
              this.facade.deleteHero(event.payload);
            } else {
              throw new ControlatedError(
                'Héroe no seleccionado',
                'notification',
                'No se ha seleccionado un héroe para eliminar'
              );
            }
          },
          fnNo: () => {},
        });
        this._notifications.showConfirmation(confirmation);

        break;

      case 'edit':
        this.router.navigate([`${PATHS.HEROES_EDIT}/${event.payload?.id}`]);
        break;

      default:
        break;
    }
  }
}
