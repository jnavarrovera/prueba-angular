import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ControlatedError } from '@core/models/controlated-error.model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error) => {
        console.log('error =>', error);

        const controledError = new ControlatedError(
          'Error inesperado',
          'modal',
          error.error ? error.error.message : error.message
        );
        if (error && error instanceof HttpErrorResponse) {
          if (error.status >= 500) {
            controledError.output = 'modal';
            controledError.title = 'Error del servidor'; // no suele ser necesario dar tanta información, se hace por demostración
          } else if (error.status === 401) {
            controledError.output = 'modal';
            controledError.title = 'No autenticado'; // no suele ser necesario dar tanta información, se hace por demostración
          } else if (error.status === 403) {
            controledError.output = 'notification';
            controledError.title = 'No Autorizado'; // no suele ser necesario dar tanta información, se hace por demostración
          } else if (error.status === 422) {
            controledError.output = 'notification';
            controledError.title = 'Error de validación';
          }
        }

        return throwError(() => controledError);
      })
    );
  }
}
