import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeserviceService } from '../employee.service';
import { MyserviceService } from '../myservice.service';

interface employee {
  value: string;
  viewValue: string;
  valueId: number;
}

@Component({
  selector: 'app-welcome-admin',
  templateUrl: './welcome-admin.component.html',
  styleUrls: ['./welcome-admin.component.css']
})
export class WelcomeAdminComponent implements OnInit {
  // datas: any = [];
  bell_icon = "&#x1F514"
  bell = "../assets/bell_icon1.jpg"
  boy_icon = "../assets/user-icon.png"
  details: boolean = false;
  selectedLevel: any;
  employees: employee[] = [];
  emp_id!: number;
  id: number = history.state.data;
  username!: string;
  email!: string;
  values: any[] = []

  constructor(private router: Router, private employeeService: EmployeeserviceService,
    private myService: MyserviceService) { }
  ngOnInit(): void {
    this.myService.get_admin_by_id(history.state.data).subscribe((response) => {
      this.username = response.username,
      this.email = response.email

    })

    this.employeeService.getAllEmployee().subscribe((response) => {
      this.values = response
      console.log("admin_id is :",history.state.data)


      // this.datas = response,console.log(response.emp_name)
      for (let i = 0; i < response.length; i++) {
        this.emp_id = response[i].emp_id
        console.log("emp_id is :",this.emp_id)
        // this.employees.push(response[i].emp_name)

        this.employees.push( { value: response[i].emp_name, viewValue: response[i].emp_name , valueId: response[i].emp_id})
        // console.log(response[i].emp_name)
        // this.employees.push()

      }
     console.log(this.employees)
      // console.log(typeof this.datas[0])
      // console.log(this.datas[0])
      // console.log(this.datas);

    })


  }


  onsave() {


    this.router.navigate(['/notification']);
  }
  onsave1() {
    // console.log(this.datas[0])
    this.router.navigate(['/login']);
  }
  onsave2() {

    this.router.navigate(['/user']);
  }
  onsave3() {


    this.router.navigate(['/list_attendance'],{state:{data: this.id}});
  }
  onsave4() {


    this.router.navigate(['/attendance-management'],{state:{data: this.id}});
  }
  onsave5() {
    // console.log(this.selectedLevel)
    this.router.navigate(['/absence'],{state:{data: this.selectedLevel}});
  }
  showNotification() {
    this.details = !this.details
    if (this.details == true) {
      const admindetails = document.getElementById('admin-details') as HTMLDivElement;
      admindetails.style.display = 'block';
    }
    else {
      this.hideNotification();
    }

  }
  hideNotification() {
    // Hide the notification box
    const admindetails = document.getElementById('admin-details') as HTMLDivElement;
    admindetails.style.display = 'none';
  }


}
