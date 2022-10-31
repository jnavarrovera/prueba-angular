import { Injectable } from '@angular/core';
import { Pagination } from '@core/interfaces/pagination.interface';
import { StateService } from '@core/interfaces/state-service.interface';
import { Hero } from '@core/models/hero.model';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeroStateService implements StateService<Hero> {
  private heroes$: BehaviorSubject<Hero[]> = new BehaviorSubject<Hero[]>([]);
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private pagination$: BehaviorSubject<Pagination> =
    new BehaviorSubject<Pagination>({
      total: 0,
      per_page: 10,
      current_page: 1,
    });
  private selected$: Subject<Hero> = new Subject<Hero>();

  constructor() {}

  isLoading$(): Observable<boolean> {
    return this.loading$.asObservable();
  }

  setLoading(isLoading: boolean): void {
    this.loading$.next(isLoading);
  }

  get$(): Observable<Hero[] | null> {
    return this.heroes$.asObservable();
  }

  set(elements: Hero[]): void {
    this.heroes$.next(elements);
  }

  getPagination$() {
    return this.pagination$.asObservable();
  }

  setPagination(value: Pagination) {
    this.pagination$.next(value);
  }

  getSelected$() {
    return this.selected$.asObservable();
  }

  setSelected(value: Hero) {
    this.selected$.next(value);
  }

  add(element: Hero): void {
    const heroes = this.heroes$.value;
    heroes.unshift(element);
    this.heroes$.next(heroes);
  }

  update(element: Hero): void {
    const heroes = this.heroes$.value;
    const index = heroes.findIndex((hero) => hero.id === element.id);
    heroes[index] = element;
  }

  remove(element: Hero): void {
    const heroes = this.heroes$.value;
    this.heroes$.next(heroes.filter((hero) => hero.id !== element.id));
  }
}
