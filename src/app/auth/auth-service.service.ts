import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, User } from './auth-model';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  currentUserSubject = new BehaviorSubject<User>(null);
  constructor(private http: HttpClient, private router: Router) { }
  signup(user_signup: { email, password, returnSecureToken }) {
    return this.http.post<AuthResponse>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBLg9dUtnjPhdkAWFDJxPPuHwaCCMZujf8', user_signup);
    // tap<AuthResponse>(userData => {
    //   const expirationDate = new Date(new Date().getTime() + +userData.expiresIn * 1000)
    //   const user = new User(
    //     userData.email,
    //     userData.localId,
    //     userData.idToken,
    //     expirationDate,
    //   )
    //   this.currentUserSubject.next(user);
    // })

  }
  login(user_login: { email, password, returnSecureToken }): Observable<any> {
    return this.http.post<AuthResponse>
      ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBLg9dUtnjPhdkAWFDJxPPuHwaCCMZujf8', user_login);

  }
  logout() {
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth']);
  }
}
