import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { User } from '../../../../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AccountServiceService {
  private token: string;
  private BASE_URL: String = 'http://localhost:8000/api/users/';
  constructor(private http: HttpClient,
              private router: Router ) { }

  getToken() {
    return this.token;
  }
  login(user: User) {
    return this.http.post<{token: string}>(this.BASE_URL + 'login', user)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          this.router.navigateByUrl('/user');
        }
      });
  }
  // Signup function
  signup(user: User): Observable<any> {
    return this.http.post(this.BASE_URL + 'signup', user)
      .pipe(map((res ) => {
          return res ;
        }
      ));
  }
  }

