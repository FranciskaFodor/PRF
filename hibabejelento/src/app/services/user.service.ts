import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/login', {username: username, password: password}, httpOptions);
  }

  logout(): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/logout', httpOptions);
  }

  register(username: string, password: string, role:string, vezeteknev: string, keresztnev: string, email: string): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/register', {username: username, password: password,
      role: role, vezeteknev: vezeteknev, keresztnev: keresztnev, email: email}, httpOptions);
  }

  getUserByUsername(username: string): Observable<any> {
    const params = new HttpParams();
    params.set('username', username);
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
    };
    return this.http.get('http://localhost:3000/getUserByUsername/' + username, httpOptions);

  }

  update(username: string, vezeteknev: string, keresztnev: string, email: string): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/update',
      {username: username, vezeteknev: vezeteknev, keresztnev: keresztnev, email: email}, httpOptions);
  }

}
