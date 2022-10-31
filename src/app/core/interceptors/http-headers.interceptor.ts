import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "@env/environment";

@Injectable()
export class HttpHeadersInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    //Si la petición que hacemos es hacia nuestro backend
    if (request.url.includes(environment.api_server)) {
      const newRequest = request.clone(
        {headers: request.headers.set("Content-Type", "application/json")}
      );
      return next.handle(newRequest);
    }
    return next.handle(request);
  }
}
