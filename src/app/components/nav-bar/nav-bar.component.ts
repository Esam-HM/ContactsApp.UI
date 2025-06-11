import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { User } from '../../features/auth/models/app-user-model';
import { LanguageSwitcherComponent } from "../language-switcher/language-switcher.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [TranslateModule, RouterLink, RouterLinkActive, CommonModule, LanguageSwitcherComponent],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit, OnDestroy {
  collapseMenu : boolean = true;
  userSubscription? : Subscription;
  user? : User;

  constructor(private authService: AuthService,
    private router: Router
  ){}

  toggleMenu() {
    this.collapseMenu = !this.collapseMenu;
  }

  onLogoutClicked(): void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  ngOnInit(): void {
    this.userSubscription = this.authService.$user.subscribe({
      next: (response) => {
        this.user = response;
      }
    });

    this.user = this.authService.getUser();
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
