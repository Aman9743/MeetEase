import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptorInterceptor implements HttpInterceptor {
  sharedData: any;
  token = localStorage.getItem('token');

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    console.log(this.token)
    if (this.token && this.token != 'undefined') {
      const head = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          accept: '*/*',
          Authorization: `Bearer ${this.token}`,
        },
      });
      return next.handle(head);
    } else {
      const head = request.clone({
        setHeaders: {
          'content-type': 'application/json',
          accept: '*/*',
          // Authorization: `Bearer ${this.token}`,
        },
      });
      return next.handle(head);
    }
  }
}
