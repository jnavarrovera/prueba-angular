import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { TitleService } from '@core/services/title.service';
import { TitleUtil } from '@core/utils/title.utils';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PageTitleResolver implements Resolve<string> {
  constructor(private titleSvc: TitleService) {}
  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<string> | Promise<string> | string {
    const title =
      TitleUtil.getRouteTitle(TitleUtil.getResolvedUrl(route)) ?? '';

    this.titleSvc.setTitle(title);
    return Promise.resolve(title);
  }
}
