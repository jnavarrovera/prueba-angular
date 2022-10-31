import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PATHS } from '@core/constants/paths.constants';
import { Hero } from '@core/models/hero.model';
import { Notification } from '@core/models/notification.model';
import { HeroApiService } from '@core/services/api/hero-api.service';
import { NotificationHubService } from '@core/services/notification-hub.service';
import { HeroStateService } from '@core/services/state/hero-state.service';
import { GenerateUtils } from '@core/utils/generate.utils';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroFacadeService {
  get heroes$() {
    return this._state.get$();
  }
  get isLoading$() {
    return this._state.isLoading$();
  }
  get pagination$() {
    return this._state.getPagination$();
  }
  get hero$() {
    return this._state.getSelected$();
  }

  constructor(
    private _api: HeroApiService,
    private _state: HeroStateService,
    private _notifications: NotificationHubService,
    private _router: Router
  ) {}

  loadHeroes(param?: { [key: string]: any }) {
    this._state.setLoading(true);
    this._api
      .list(param)
      .pipe(finalize(() => this._state.setLoading(false)))
      .subscribe((resp) => {
        this._state.set(resp.data);
        if (resp.pagination) {
          this._state.setPagination(resp.pagination);
        }
      });
  }

  addHero(hero: Hero) {
    this._state.setLoading(true);
    this._api
      .create(hero)
      .pipe(finalize(() => this._state.setLoading(false)))
      .subscribe((resp) => {
        const notification = new Notification({
          title: 'Héroe creado con éxito',
          output: 'message',
          type: 'success',
        });
        this._notifications.show(notification);
        this._router.navigate([PATHS.HEROES]);
      });
  }

  deleteHero(hero: Hero) {
    this._state.setLoading(true);
    this._api
      .delete(hero)
      .pipe(finalize(() => this._state.setLoading(false)))
      .subscribe(() => {
        this.loadHeroes({ ...GenerateUtils.initPagination() });
        const notification = new Notification({
          title: 'Héroe eliminado con éxito',
          output: 'message',
          type: 'success',
        });
        this._notifications.show(notification);
      });
  }

  getHero(id: number) {
    this._state.setLoading(true);
    this._api
      .get(id)
      .pipe(finalize(() => this._state.setLoading(false)))
      .subscribe((resp) => {
        this._state.setSelected(resp);
      });
  }

  updateHero(hero: Hero) {
    this._state.setLoading(true);
    this._api
      .update(hero)
      .pipe(finalize(() => this._state.setLoading(false)))
      .subscribe((resp) => {
        const notification = new Notification({
          title: 'Héroe modificado con éxito',
          output: 'message',
          type: 'success',
        });
        this._notifications.show(notification);
        this._router.navigate([PATHS.HEROES]);
      });
  }
}
