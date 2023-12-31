import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IsSignedInGuard {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    const isSignedIn = this.authService.isSignedIn();

    if (!isSignedIn) {
      this.router.navigate(['/signin']);
    }
    return isSignedIn;
  }
}
