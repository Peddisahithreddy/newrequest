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
export class RequestService {

  private apiUrl = 'http://localhost:5000/request'; // Update with your Flask API URL

  constructor(private http: HttpClient) {}

  post_request(requestData: any): Observable<any> {
    const url = `${this.apiUrl}`;
    return this.http.post(this.apiUrl,requestData);
  }
  get_request(): Observable<any> {
    return this.http.get(this.apiUrl)
  }
  singleRequest(request_id: number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${request_id}`)
  }
  deleteRequest(request_id: number): Observable<any>{
    return this.http.delete(`${this.apiUrl}/${request_id}`)
  }
}
