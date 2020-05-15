import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient,
              private route: ActivatedRoute) { }

  newComplaint(username: string, szolgTipus: string, hibaLeiras: string,
               cim: string, telefon: string): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post('http://localhost:3000/newComplaint',
      {username: username, szolgTipus: szolgTipus, hibaLeiras: hibaLeiras, cim: cim, telefon: telefon}, httpOptions);
  }

  getComplaintListByUsername(username: string): Observable<any> {
    const params = new HttpParams();
    params.set('username', username);
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: params
    };
    return this.http.get('http://localhost:3000/getComplaintListByUsername/' + username, httpOptions);

  }

  getAllComplaint(): Observable<any> {
    const httpOptions = {
      //withCredentials: true,
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get('http://localhost:3000/getAllComplaint', httpOptions);

  }
}
