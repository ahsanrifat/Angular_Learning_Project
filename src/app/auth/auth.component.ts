import { AuthServiceService } from './auth-service.service';
import { EmailValidator, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: NgForm;
  isLoginMode = true;
  constructor(private auth: AuthServiceService) { }

  ngOnInit(): void {
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmitAuthForm(authForm) {
    if (authForm.valid) {
      const email = authForm.value.email
      const password = authForm.value.password
      console.log(email, password)
      if (this.isLoginMode) {
        // login check
      }
      else {
        this.auth.signup({ email: email, password: password, returnSecureToken: true })
          .subscribe((response) => {
            console.log(response);
          }, error => {
            console.log(error);
          });
      }


      // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    } else {
      return;
    }
  }

}
