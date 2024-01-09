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

export class EmployeeserviceService {

  private baseUrl = 'http://localhost:5000';
   // Adjust with your Flask server address

  private Url = 'http://localhost:5000/login'
  constructor(private http: HttpClient) {}

  createEmployee(employee: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/employees`, employee);
  }
  

  getEmployeeById(emp_id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees/${emp_id}`);
  }
  getAllEmployee(): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees`)
  }
  getEmployeeByUsername(username: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/employees?username=${username}`);
  }

  // checkEmployeePassword(username: string, password: string): Observable<any> {
  //   return this.http.post(`${this.baseUrl}/employees/check-password`, { username, password });
  // }

  updateEmployeePassword(username: string, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/employees/${username}/update-password`, { newPassword });
  }

  deleteEmployee(empId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/employees/${empId}`);
  }
  login(username: string, password: string): Observable<any> {
    const body = {username, password };
    return this.http.post(this.Url, body,httpOptions);

}
}
