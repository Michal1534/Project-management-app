import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ErrorService } from '../../error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private errorService : ErrorService){}

  public intercept(httpRequest: HttpRequest<unknown>, httpHandler: HttpHandler): Observable<HttpEvent<unknown>> {
    return httpHandler.handle(httpRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        switch ((<HttpErrorResponse>error).status) {
        default:
          this.errorService.displayError();
          return throwError(() => error);
        }
      })
    );
  }
}
