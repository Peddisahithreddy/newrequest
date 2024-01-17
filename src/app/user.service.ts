import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private Url = 'http://127.0.0.1:5000/users';

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(this.Url)
  }

  getUser(userId: string): Observable<any> {
    const url = `${this.Url}/${userId}`;
    return this.http.get(url);
  }


  createUser(user:any): Observable<any> {


    return this.http.post(this.Url,user,httpOptions);

  }
  deleteUser(userId:string): Observable<any> {
    return this.http.delete(`${this.Url}/${userId}`);
  }


}
