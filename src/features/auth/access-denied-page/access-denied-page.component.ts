import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-denied-page',
  standalone: true,
  imports: [],
  templateUrl: './access-denied-page.component.html',
  styleUrl: './access-denied-page.component.css'
})
export class AccessDeniedPageComponent {
  constructor(private router: Router) {}

  returnBack(): void{
    this.router.navigateByUrl("/contacts");
  }
}
