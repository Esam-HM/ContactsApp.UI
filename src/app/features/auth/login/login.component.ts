import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../models/login-request-model';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { User } from '../models/app-user-model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertMessageComponent } from '../../../components/alert-message/alert-message.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule, AlertMessageComponent, TranslateModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy{
  request : LoginRequest;
  loginSubscription? : Subscription;
  alertMessage : string = "";
  showAlert: boolean = false;

  constructor(private authService: AuthService,
    private router: Router
  ){
    this.request = {
      email: "",
      password: ""
    }
  }

  ngOnInit(): void {
    this.getNavigationMessage();
  }

  onFormSubmit(): void{
    console.log(this.request);
    this.loginSubscription = this.authService.login(this.request).subscribe({
      next: (response) => {
        console.log(response);
        this.authService.storeUserToken(response.token);
        const user: User = {
          fullName : response.fullName,
          email: response.email,
          roles : response.roles
        };
        this.authService.setUser(user);
        this.router.navigateByUrl("/contacts");
      },
      error: (errorResponse) => {
        console.log(errorResponse.error.errors);
      } 
    });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  getNavigationMessage(): void {
    const message : string = history.state?.message;
    if(message){
      this.showAlert = true;
      this.alertMessage = message;
      history.replaceState({},'');
    }
  }

}
