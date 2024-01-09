import { HttpClient,HttpHeaders } from '@angular/common/http';
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
export class AbsenceService {

  constructor(private http: HttpClient) { }
  url = 'http://127.0.0.1:5000/absence'

  get_absence(leave_id: number): Observable<any>{
    return this.http.get(`${this.url}/${leave_id}`)
  }
  postAbsence(data: any): Observable<any> {
    return this.http.post<any>(this.url, data);
  }
}
