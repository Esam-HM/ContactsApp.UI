import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RegisterRequest } from '../models/register-request-model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{
  model : RegisterRequest;
  registerSubscription? : Subscription;

  constructor(private authService: AuthService,
    private router: Router
  ){
    this.model = {
      fullName : '',
      email: '',
      password: ''
    };
  }

  onFormSubmit(): void{
    this.authService.register(this.model).subscribe({
      next: (response) => {
        console.log(response);
        this.router.navigateByUrl("/login", {
          state : { message : "Registration Success"}
        });
      },
      error: (errorResponse) => {
        console.log(errorResponse.error.errors);
      }
    });
  }

  ngOnDestroy(): void {
    this.registerSubscription?.unsubscribe();
  }
}
