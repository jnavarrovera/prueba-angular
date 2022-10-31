import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FullLoaderService } from '@core/services/full-loader.service';
import { environment } from '@env/environment';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private _loaderSvc: FullLoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.url.includes(environment.api_server)) {
      this._loaderSvc.show();
      return next.handle(request).pipe(
        finalize(() => {
          this._loaderSvc.hide();
        })
      );
    }
    return next.handle(request);
  }
}
