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
export class AttendanceService {

  constructor(private http:HttpClient) { }
  Url = 'http://127.0.0.1:5000/attendance'

  get_week_attendance(): Observable<any>{
    //const url = `${this.Url}`
    return this.http.get(this.Url)
  }

  post_attendance(datajson: any): Observable<any>{
    const url = `${this.Url}`;
    return this.http.post(this.Url,datajson,httpOptions)
  }
  get_attendance(): Observable<any>{
    const url = `${this.Url}`
    return this.http.get(this.Url)
  }
  get_attendance_by_id(employeeId: string): Observable<any>{
    const url = "http://127.0.0.1:5000/employees"
    return this.http.get(`${this.Url}/${employeeId}`)
  }
}
