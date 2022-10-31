import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FullLoaderService {
  private _showLoader$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  public get showLoader$(): Observable<boolean> {
    return this._showLoader$.asObservable();
  }

  constructor() {}

  public show() {
    this._showLoader$.next(true);
  }

  public hide() {
    this._showLoader$.next(false);
  }

  public setValue(value: boolean) {
    this._showLoader$.next(value);
  }
}
