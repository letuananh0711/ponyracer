import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationFailed: boolean;
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;
  userForm: FormGroup;
  passwordForm: FormGroup;

  static passwordMatch(group: AbstractControl): { matchingError: true } | null {
    const password = group.get('password').value;
    const confirm = group.get('confirmPassword').value;

    return password === confirm ? null : { matchingError: true };
  }

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = this.fb.control('', Validators.required);
    this.confirmPasswordCtrl = this.fb.control('', Validators.required);
    this.birthYearCtrl = this.fb.control('', [Validators.required, Validators.min(1900), Validators.max(new Date().getFullYear())]);

    this.passwordForm = this.fb.group(
      {
        password: this.passwordCtrl,
        confirmPassword: this.confirmPasswordCtrl
      },
      {
        validators: RegisterComponent.passwordMatch
      }
    );

    this.userForm = this.fb.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  register(): void {
    console.log(this.userForm.value);
    this.userService
      .register(this.userForm.value.login, this.userForm.value.passwordForm.password, this.userForm.value.birthYear)
      .subscribe({
        next: () => this.router.navigate(['/']),
        error: () => (this.registrationFailed = true)
      });
  }
}
