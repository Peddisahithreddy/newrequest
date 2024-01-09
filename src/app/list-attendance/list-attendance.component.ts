import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-list-attendance',
  templateUrl: './list-attendance.component.html',
  styleUrls: ['./list-attendance.component.css']
})
export class ListAttendanceComponent implements OnInit{
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  emp_name!: string;
  status!: string;
  username!: string;
  email!: string;
  id: number = history.state.data;

  constructor(private router: Router,private attendanceService: AttendanceService,
    private myService: MyserviceService) {}
  ngOnInit(): void {

    this.myService.get_admin_by_id(history.state.data).subscribe((response) => {
      this.username = response.username,
      this.email = response.email
    })
    this.attendanceService.get_attendance().subscribe((response) => {
      // console.log(response)
      this.emp_name = response[0].emp_name
      this.status = response[0].status
      console.log(this.emp_name,this.status,response)
    })
  }

  onsave(){

  this.router.navigate(['/calendar-details']);
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
