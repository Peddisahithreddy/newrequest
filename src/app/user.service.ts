import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {

  private Url = 'http://127.0.0.1:5000/users';

  constructor(private http: HttpClient) { }
  getAllUsers(): Observable<any> {
    return this.http.get(this.Url)
  }

  getUser(userId: number): Observable<any> {
    const url = `${this.Url}/${userId}`;
    return this.http.get(url);
  }


  createUser(user:any): Observable<any> {
    const headers = new HttpHeaders({'Content-Type':'aplication/json'});
    return this.http.post(this.Url,JSON.stringify(user),{headers});

  }
  deleteUser(userId:number): Observable<any> {
    return this.http.delete('this.Url/${userId}');
  }


}
