import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSearch,
  faShoppingCart,
  faSignOut,
} from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';
import { AnnouncementComponent } from '../announcement/announcement.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    AnnouncementComponent,
    RouterModule,
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  faSearch = faSearch;
  faShoppingCart = faShoppingCart;

  constructor(private authService: AuthService, private router: Router) {}

  handleLogout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  hasUserSession(): boolean {
    return this.authService.hasUserSession();
  }
}
