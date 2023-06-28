import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const tokenOrNull = localStorage.getItem('token');

    const modifiedRequest = (tokenOrNull) ? request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + tokenOrNull
      }
    }) : request;

    return next.handle(modifiedRequest);
  }
}
