import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) { }

  /**
   * The intercept function takes in a request and a next handler, and returns an observable of type
   * HttpEvent.
   * 
   * @param request - HttpRequest<unknown> - The request object
   * @param {HttpHandler} next - The next interceptor in the chain.
   * @returns The next handler in the chain.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    return next.handle(request);
  }
}
