import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};



@Injectable({
  providedIn: 'root'
})
export class TimeoffService {
  private url = 'http://127.0.0.1:5000/timeoff'
  constructor(private http: HttpClient) { }
  get_timeoff_by_id(emp_id: number): Observable<any>{
    return this.http.get(`${this.url}/${emp_id}`)
  }
}
