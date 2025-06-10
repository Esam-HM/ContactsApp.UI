import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { User } from '../models/app-user-model';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const router = inject(Router);

  let token : string = cookieService.get("Authorization");
  const user = authService.getUser();

  if(token != ""){
    token = token.replace("Bearer ","");
    const decodedToken : any = jwtDecode(token);

    const currentTime = new Date().getTime();

    if(decodedToken.exp*1000>currentTime){
      
      if(user && user.roles.includes("Writer") && user.roles.includes("Reader")){
        return true;
      
      }else{
        alert("Not authorized");
        return false;
      }
    }else{
      authService.logout();
    }
  }
  
  return router.createUrlTree(
    ["/login"], { queryParams : { returnUrl : state.url}}
  );
};
