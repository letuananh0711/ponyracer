import { Component } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  BIRTH_YEAR_MIN = 1900;
  BIRTH_YEAR_MAX = new Date().getFullYear();

  loginCtrl = this.fb.control('', [Validators.required, Validators.minLength(3)]);

  passwordCtrl = this.fb.control('', Validators.required);
  confirmPasswordCtrl = this.fb.control('', Validators.required);
  passwordGroup = this.fb.group(
    { password: this.passwordCtrl, confirmPassword: this.confirmPasswordCtrl },
    { validators: RegisterComponent.passwordMatch }
  );

  birthYearCtrl = this.fb.control<number | null>(null, [
    Validators.required,
    Validators.min(this.BIRTH_YEAR_MIN),
    Validators.max(this.BIRTH_YEAR_MAX)
  ]);

  userForm = this.fb.group({
    login: this.loginCtrl,
    passwordForm: this.passwordGroup,
    birthYear: this.birthYearCtrl
  });
  // check if the password and confirming password are matched
  static passwordMatch(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')!.value;
    const confirmPassword = formGroup.get('confirmPassword')!.value;

    return password === confirmPassword ? null : { matchingError: true };
  }

  registrationFailed = false;

  constructor(private fb: NonNullableFormBuilder, private userService: UserService, private router: Router) {}

  /* Function handler on submit registration of a new user */
  register(): void {
    const formValue = this.userForm.value;
    this.userService.register(formValue.login!, formValue.passwordForm!.password!, formValue.birthYear!).subscribe({
      next: () => this.router.navigateByUrl('/'),
      error: () => (this.registrationFailed = true)
    });
  }
}
