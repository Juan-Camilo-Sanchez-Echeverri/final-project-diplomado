import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.authService.getUser();
    if (user && user.role === 'admin') {
      console.log('Admin access granted');

      return true;
    } else {
      console.log('Admin access denied');
      this.router.navigate(['/home']);
      return false;
    }
  }
}
