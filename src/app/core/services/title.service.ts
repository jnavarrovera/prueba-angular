import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TitleService {
  private title$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  getTitle() {
    return this.title$.asObservable();
  }

  setTitle(value: string) {
    this.title$.next(value);
  }
  constructor() {}
}
