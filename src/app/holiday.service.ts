import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class HolidayService {

  constructor(private http: HttpClient) {}
  private url = 'http://127.0.0.1:5000/holiday'
  get_holiday(): Observable<any>{
    return this.http.get(this.url)
  }

  }

