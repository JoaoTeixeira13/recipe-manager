import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;

  constructor(private authService: AuthService) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    console.log('form value is: ', form.value);

    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (this.isLoginMode) {
      //login goes here
    } else {
      this.authService.signUp(email, password).subscribe(
        (responseData) => {
          console.log('response data is, ', responseData);
        },
        (error) => {
          console.log('error during sign up', error);
        }
      );
    }

    form.reset();
  }
}
