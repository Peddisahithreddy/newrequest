import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  private Url = 'http://127.0.0.1:5000/authenticate';
  private url = 'http://127.0.0.1:5000/admins'

  constructor(private http: HttpClient) { }
  get_admin_by_id(id: number): Observable<any>{
    return this.http.get(`${this.url}/${id}`)
  }

  // makeRequest() {
  //   const url = '/api/some_endpoint'; // Replace with the actual API endpoint
  //   const requestData = { key: 'value' };

  //   return this.http.post(url, requestData);
  // }

  login(username: string, password: string): Observable<any> {
    const data = { username, password }; //storing the unmae and password in the form of dictionary
    return this.http.post(this.Url, data,httpOptions);
}
}
