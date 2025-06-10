import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/app-user-model';
import { environment } from '../../../environments/environment.development';
import { RegisterRequest } from '../models/register-request-model';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { LoginResponse } from '../models/login-response-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient,
    private cookieService: CookieService
  ) { }

  login(request : LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${environment.baseApiUrl}/api/auth/login`,request);
  }

  register(request: RegisterRequest): Observable<any>{
    return this.http.post<any>(`${environment.baseApiUrl}/api/auth/register`,request);
  }

  storeUserToken(token: string): void{
    this.cookieService.set(
      "Authorization",
      `Bearer ${token}`,
      undefined,
      "/",
      undefined,
      true,
      "Strict"
    );
  }

  setUser(user:User): void{
    if(user.fullName){
      localStorage.setItem("user-fullName", user.fullName);
    }
    localStorage.setItem("user-email",user.email);
    localStorage.setItem("user-roles",user.roles.join(","));
    this.$user.next(user);
  }

  getUser(): User | undefined{
    const email = localStorage.getItem("user-email");
    const fullName = localStorage.getItem("user-fullName");
    const roles = localStorage.getItem("user-roles");

    if(email && roles){
      const user : User = {
        fullName: fullName,
        email: email,
        roles: roles?.split(",")
      };
      return user;
    }
    return undefined;
  }

  logout(): void{
    this.cookieService.delete("Authorization","/");
    localStorage.clear();
    this.$user.next(undefined);
  }
  
}
