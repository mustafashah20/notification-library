import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private rootUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  login(username: String, password: String): Observable<any> {
    const url = `${this.rootUrl}/users/login`;
    const body = {
      username: username,
      password: password,
    };
    return this.http.post<any>(url, body, httpOptions);
  }

  register(username: String, password: String): Observable<any> {
    const url = `${this.rootUrl}/users/register`;
    const body = {
      username: username,
      password: password,
    };
    return this.http.post<any>(url, body, httpOptions);
  }
}
