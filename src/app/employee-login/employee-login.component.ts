import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../employee.service';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  logo="../assets/astreya-logo.jpeg"
  username: string = '';
  password: string = '';
  emp_id!: number;
  constructor(private router: Router,private employeeService: EmployeeserviceService) {}
  onsave(){
    this.employeeService.login(this.username,this.password).subscribe((response) => {
      console.log(this.username,this.password)
      this.emp_id = Number(response)
      console.log(this.emp_id)
      this.router.navigate(['/welcome-employee'],{state:{data:this.emp_id}});

    })
    }

}
