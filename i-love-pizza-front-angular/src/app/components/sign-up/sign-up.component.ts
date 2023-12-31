import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  constructor(private authService: AuthService) {}

  createAccount(email: string, password: string) {
    this.authService
      .signUp(email, password)
      .subscribe((value) => console.log(value));
  }
}
