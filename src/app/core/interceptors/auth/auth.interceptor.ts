import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');
        if (token) {
            const requestToken = httpRequest.clone({
                headers: httpRequest.headers.set('Authorization', 'Bearer ' + token),
            });

            return httpHandler.handle(requestToken);
        }

        return httpHandler.handle(httpRequest);
    }
}
