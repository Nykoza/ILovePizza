import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(private authService: AuthService) {}

  signIn(email: string, password: string) {
    this.authService
      .signIn(email, password)
      .subscribe((value) => console.log(value));
  }
}
