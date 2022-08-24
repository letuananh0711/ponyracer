import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    login: '',
    password: ''
  };
  authenticationFailed = false;

  constructor(private userService: UserService, private router: Router) {}

  authenticate(): void {
    this.userService.authenticate(this.credentials).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.authenticationFailed = true)
    });
  }
}
