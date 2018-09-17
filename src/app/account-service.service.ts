import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { Observable} from 'rxjs';
import { User } from '../../models/user';
@Injectable({
  providedIn: 'root'
})

export class AccountServiceService {
  private BASE_URL: String = 'http://localhost:8000/api/users/';
  constructor(private http: HttpClient) { }

  login(user: User): Observable<any> {
    return this.http.post(this.BASE_URL + 'login', user)
      .pipe(map((res ) => {
          console.log(res);
          return res ;
        }
      ));
  }
  }

