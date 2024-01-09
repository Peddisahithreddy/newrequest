import { Component,Inject,OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeserviceService } from '../employee.service';
import { RequestService } from '../request.service';
import { da } from 'date-fns/locale';


@Component({
  selector: 'app-pick-date',
  templateUrl: './pick-date.component.html',
  styleUrls: ['./pick-date.component.css']
})
export class PickDateComponent implements OnInit{
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  selectedLevel!: any;
  startDate!: string;
  endDate!: string;
  emp_id: number = history.state.data;
  emp_name!: string;
  approved_by!: string;
  manager!: string;
  email!: string;





  data = [
      {id: 0, name: "Casual leave"},
      {id: 1, name: "Sick leave"}
  ];
  // datajson = JSON.stringify(this.data)
  minDate: string = new Date().toISOString().split('T')[0];
  route: ActivatedRoute = inject(ActivatedRoute)
  employeeId = -1
  constructor(private router: Router,private employeeService: EmployeeserviceService,
    private requestService: RequestService,
    ) {this.employeeId = Number(this.route.snapshot.params['emp_id'])}
  ngOnInit(): void {
    console.log(this.startDate,this.endDate,this.selectedLevel)
    console.log(this.employeeId)
    this.employeeService.getEmployeeById(this.employeeId).subscribe((response) => {
      this.emp_name= response.emp_name,
      this.approved_by = response.emp_name,
      this.manager = response.emp_name,
      this.email = response.email
    })
  }
  onsave(){
    console.log(this.emp_id)
    const datajson = {
      emp_id:this.employeeId,
      emp_name:this.emp_name,
      date_from:this.startDate,
      date_to:this.endDate,
      approved_by:this.approved_by,
      manager:this.manager,
      request_type:this.selectedLevel.name,
      email: this.email

    }
    this.requestService.post_request(datajson).subscribe((response) => {
      console.log(response)

    })
    console.log(this.startDate,this.endDate,this.selectedLevel.name)
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
