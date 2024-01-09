import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { tap } from 'rxjs';
import { DialogService } from '../dialog.service';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-attendance-management',
  templateUrl: './attendance-management.component.html',
  styleUrls: ['./attendance-management.component.css']
})
export class AttendanceManagementComponent implements OnInit{
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  name!: string;
  id!: number;
  admin_id: number = history.state.data;
  admin_name!: string;
  email!: string;
  status!: string;
  successMessage$ = this.dialogService.successMessageAction$;
  errorMessage$ = this.dialogService.errorMessageAction$;
  constructor(private router: Router,private attendanceService: AttendanceService,
    private dialogService: DialogService,private myService: MyserviceService) {}
  ngOnInit(): void {
    console.log("admin_id in am is :",this.admin_id)
    this.myService.get_admin_by_id(history.state.data).subscribe((response) => {
      this.admin_name = response.username,
      this.email = response.email

    })
  }
  onsave(){
    console.log(this.status)
    const datajson = {
      'emp_name':this.name,
      'emp_id':this.id,
      'status':this.status
    }
    console.log("status in attendance-management",this.status)
    this.attendanceService.post_attendance(datajson).pipe(tap(response => {
      this.dialogService.setSuccessMessage(response.message)
      console.log(datajson)
    })).subscribe()
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
