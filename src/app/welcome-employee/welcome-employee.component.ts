import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../employee.service';

@Component({
  selector: 'app-welcome-employee',
  templateUrl: './welcome-employee.component.html',
  styleUrls: ['./welcome-employee.component.css']
})
export class WelcomeEmployeeComponent implements OnInit {
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  emp_id: number = history.state.data;
  emp_name!: string;
  email!: string;
  values!: any[];


  constructor(private router: Router,private employeeService:EmployeeserviceService) {}
  ngOnInit(): void {

    console.log("history value is :",history.state.data)
    this.employeeService.getEmployeeById(this.emp_id).subscribe((response) => {
      this.values = response
      this.email = response.email
      this.emp_name = response.emp_name})
  }
  onsave3(){

    // this.router.navigate(['/notification']);
    }
  showNotification() {
    this.details = !this.details
    if (this.details == true)
    {
      const admindetails = document.getElementById('admin-details') as HTMLDivElement;
      admindetails.style.display = 'block';
    }
    else{
      this.hideNotification();
    }

  }
 hideNotification() {
  // Hide the notification box
  const admindetails = document.getElementById('admin-details') as HTMLDivElement;
  admindetails.style.display = 'none';
}


}
