import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { TokenStorageService } from './token.service';
import { AuthService } from './auth.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { LoaderService } from './loader.service';

const TOKEN_HEADER_KEY = 'x-access-token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private tokenService: TokenStorageService,
    private loaderService: LoaderService) { }

  removeRequest(req: HttpRequest<any>) {
    const i = this.requests.indexOf(req);
    if (i >= 0) {
      this.requests.splice(i, 1);
    }
    this.loaderService.isLoading.next(this.requests.length > 0);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Object>> {
    let authReq = req;
    const token = this.tokenService.getToken();
    if (token != null) {
      authReq = this.addTokenHeader(req, token);
    }

    this.requests.push(req);

    this.loaderService.isLoading.next(true);
    this.removeRequest(req);
    return next.handle(authReq).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        return throwError(error);
      }
      this.removeRequest(req);
      return throwError(error);
    }));
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, token) });
  }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
