import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err.statusCode === '401') {
          // unauthorized
          console.log(err);
          return throwError(err.statusText);
        } else if (err instanceof HttpErrorResponse) {
          // 500 internal server error
          const appErr = err.headers.get('Application-Error');
          if (appErr) {
            console.log(appErr);
            return throwError(appErr);
          }

          // validation errors
          const otherErr = err.error.errors;
          if (otherErr && (typeof otherErr) === 'object') {
            return throwError(otherErr);
          }
        }
        console.log(err);

        return throwError('unknown error type');
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
