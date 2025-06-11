import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);

  const authRequest = req.clone({
    setHeaders : {
      "Authorization" : cookieService.get("Authorization")
    }
  });
  
  return next(authRequest);
};
