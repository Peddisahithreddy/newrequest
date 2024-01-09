import { Component, inject,OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimeoffService } from '../timeoff.service';
import { EmployeeserviceService } from '../employee.service';

@Component({
  selector: 'app-absence',
  templateUrl: './absence.component.html',
  styleUrls: ['./absence.component.css']
})

export class AbsenceComponent implements OnInit{
  girl_icon="../assets/girl-icon.png"
  timeoff!: string;
  vacation: string = 'vacation';
  date!: string;
  dayoftheweek!: string;
  type!: string;
  unitoftime!: string;
  comment!: string;
  emp_name!: string;
  position!: string;
  email!: string;

  route: ActivatedRoute = inject(ActivatedRoute);
    employeeid = -1;
    constructor(private router: Router,private timeoffService: TimeoffService,
      private employeeService: EmployeeserviceService){}
  ngOnInit(): void {
    this.employeeService.getEmployeeById(history.state.data).subscribe((response) => {
      this.emp_name = response.emp_name,
      this.email = response.email
    })
    console.log("emp_id in absence",history.state.data)

    this.timeoffService.get_timeoff_by_id(history.state.data).subscribe((response) => {
      console.log("response is : ",response[0].date)

      this.timeoff = response[0].timeoff,
      this.date = response[0].date,
      this.dayoftheweek = response[0].dayoftheweek,
      this.type = response[0].type,
      this.unitoftime = response[0].unitoftime,
      this.comment = response[0].comment
    })

  }

}
