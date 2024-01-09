import { Component, inject,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeserviceService } from '../employee.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-regularize-attendance',
  templateUrl: './regularize-attendance.component.html',
  styleUrls: ['./regularize-attendance.component.css']
})
export class RegularizeAttendanceComponent implements OnInit {
  details: boolean = false;
  route: ActivatedRoute = inject(ActivatedRoute)
  employeeId = -1
  emp_name!: string;
  approved_by!: string;
  manager!: string;
  email!: string;
  constructor(private employeeService: EmployeeserviceService,private requestService: RequestService)
  {this.employeeId = this.route.snapshot.params['emp_id']}
  ngOnInit(): void {
    console.log(this.employeeId);
    this.employeeService.getEmployeeById(this.employeeId).subscribe((response) => {
      this.emp_name = response.emp_name,
      this.approved_by = response.emp_name,
      this.manager = response.emp_name,
      this.email = response.email


    })
  }

  showNotification() {
    const datajson = {
      emp_id:this.employeeId,
      emp_name:this.emp_name,
      request_status:"Pending",
      approved_by:this.approved_by,
      manager: this.manager,
      request_type:"Regularize attendance",
      email: this.email
    }
    this.requestService.post_request(datajson).subscribe((response) => {console.log(datajson)})

    this.details = true
    if (this.details == true)
    {
      const admindetails = document.getElementById('admin-details') as HTMLDivElement;
      admindetails.style.display = 'block';
    }


  }
 hideNotification() {
   // Hide the notification box
   const admindetails = document.getElementById('admin-details') as HTMLDivElement;
   admindetails.style.display = 'none';
 }

}

