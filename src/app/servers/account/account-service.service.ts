import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../../../../models/user';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AccountServiceService {
  private token: string;
  private userEmail: string;
  private userId: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();
  private BASE_URL = environment.apiUrl + '/users';  // URL to web api
  constructor(private http: HttpClient,
    private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  autoAuthUser() {
    const authInformation = this.getLoginData();
    if (authInformation) {
      const now = new Date();
      const timeValid = authInformation.expiration > now;
      if (timeValid) {
        this.token = authInformation.token;
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
    }
  }
  login(user: User) {
    this.http.post<{ token: string }>(this.BASE_URL + 'login', user)
      .subscribe(response => {
        this.duplicated(response);
      }, error => {
        this.authStatusListener.next(false);
      });
  }
  // Signup function
  signup(user: User) {
    this.http.post<{ token: string }>(this.BASE_URL + 'signup', user)
      .subscribe(response => {
        this.duplicated(response);
      }, error => {
        this.authStatusListener.next(false);
      });
  }

  duplicated(res) {
    const token = res.token;
    this.token = token;
    if (token) {
      const expiresDuration = res.expiresIn;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expiration = new Date(now.getTime() + expiresDuration * 1000);
      console.log(expiration);
      this.userEmail = res.userEmail;
      this.userId = res.userId;
      this.saveToken(token, expiration, this.userEmail, this.userId);
      this.router.navigate(['/user']);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearToken();
    this.router.navigate(['']);
  }

  private saveToken(token: string,
    expirationDate: Date,
    userEmail: string,
    userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userEmail', userEmail);
    localStorage.setItem('userId', userId);
  }

  private clearToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
  }

  private getLoginData() {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if (!token || !expiration) {
      return null;
    }
    return {
      token: token,
      expiration: new Date(expiration)
    };
  }
}

