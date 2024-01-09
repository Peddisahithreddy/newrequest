import { Component, inject,OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { EmployeeserviceService } from '../employee.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  girl_icon="../assets/girl-icon.png"
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  emp_name!: string;
  gender!: string;
  email!: string;
  job!: string;
  route: ActivatedRoute = inject(ActivatedRoute);
    employeeid = -1;
    constructor(private router: Router,private employeeService: EmployeeserviceService) {
        this.employeeid = Number(this.route.snapshot.params['emp_id']);
    }
  ngOnInit(): void {
    console.log(this.employeeid)
    this.employeeService.getEmployeeById(this.employeeid).subscribe((response) =>{
      this.emp_name = response.emp_name,
      this.gender = response.gender,
      this.email = response.email,
      this.job = response.job_position
    })
  }
  onsave(){

  this.router.navigate(['/login']);
  }
  onsave2(){

    this.router.navigate(['/login']);
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
