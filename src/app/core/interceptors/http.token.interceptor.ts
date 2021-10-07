import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService, SpinnerService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class HttpTokenInterceptor implements HttpInterceptor {
  constructor(
    private jwtService: JwtService,
    private spinnerServ: SpinnerService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerServ.toggleSpinner(true);

    const headersConfig = {
      //'Content-Type': 'application/json',
      //Accept: 'application/json',
      Authorization: '',
    };

    const token = this.jwtService.getToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }

    const request = req.clone({ setHeaders: headersConfig });
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this.spinnerServ.toggleSpinner(false);
          }
        },
        (error) => {
          this.spinnerServ.toggleSpinner(false);
        }
      )
    );
  }
}
