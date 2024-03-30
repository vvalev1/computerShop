import { Injectable, Provider } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()
class TokenInterceptor implements HttpInterceptor {
  
  constructor() {
    
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    const reqClone = request.clone({
      headers: request.headers.append('X-Authorization', String(token)).append('content-type', 'application/json')

    });

    if(token) {
      
      return next.handle(reqClone);
    }
    return next.handle(request);
  }
}

export const TokenProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: TokenInterceptor,
  multi: true
}
