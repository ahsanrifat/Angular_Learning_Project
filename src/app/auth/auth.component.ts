import { Router } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { EmailValidator, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthResponse, User } from './auth-model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  constructor(private auth: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.auth.currentUserSubject.subscribe(user => {
      console.log(user);
    })
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  setUser(userData: AuthResponse) {
    const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000)
    const user = new User(
      userData.email,
      userData.localId,
      userData.idToken,
      expirationDate,
    )
    this.auth.currentUserSubject.next(user)
  }
  onSubmitAuthForm(authForm) {
    if (authForm.valid) {
      const email = authForm.value.email
      const password = authForm.value.password
      // console.log(email, password)
      if (this.isLoginMode) {
        this.isLoading = true;
        this.auth.login({ email: email, password: password, returnSecureToken: true })
          .subscribe((response) => {
            // console.log(response);
            this.setUser(response);
            this.isLoading = false;
            // this.router.navigate(['/recipes'])
          }, errorResponse => {
            this.error = "Error Occurred"
            // if (errorResponse.error.error.message) {
            //   this.error = errorResponse.error.error.message
            // }
            // console.log(errorResponse);
            this.isLoading = false;
          });
      }
      else {
        this.isLoading = true;
        this.auth.signup({ email: email, password: password, returnSecureToken: true })
          .subscribe((response) => {
            // console.log(response);
            this.setUser(response);
            this.isLoading = false;
            // this.router.navigate(['/recipes'])
          }, errorResponse => {
            this.error = "Error Occurred"
            // console.log(errorResponse);
            switch (errorResponse.error.error.message) {
              case 'EMAIL_EXISTS':
                this.error = "Email Already Exists"
            }
            // this.error = 'An Error Occurred'
            this.isLoading = false;
          });
      }


      // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
    } else {
      return;
    }
  }

}
