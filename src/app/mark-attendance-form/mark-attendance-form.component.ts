import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../dialog.service';
import { tap } from 'rxjs';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-mark-attendance-form',
  templateUrl: './mark-attendance-form.component.html',
  styleUrls: ['./mark-attendance-form.component.css']
})
export class MarkAttendanceFormComponent implements OnInit{

  username!: string;
  userId!: number;
  message: string = '';
  details: boolean = false;
  successMessage$ = this.dialogService.successMessageAction$;
  errorMessage$ = this.dialogService.errorMessageAction$
  constructor(private router: Router, private attendanceService: AttendanceService,
    private dialogService: DialogService,private myService: MyserviceService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  onSubmit() {
    this.details = true;

    // Check if 'details' is true

    const jsonData = {
      "emp_id": this.userId,
      "emp_name": this.username
    }
    this.attendanceService.post_attendance(jsonData).pipe(
      tap(response => {
        console.log("function response is :",response)
        console.log("response is :",response.message)
        if (response.message == 'Employee not found') {
          this.message = response.message
          console.log("inside emp not found",response.message)
          this.router.navigate(['/face-not-recognised'])
        }
        else if (response.message == 'Your exit time has been updated') {
          this.message=response.message
          console.log(response.message)
          this.dialogService.setSuccessMessage(response);

          if (this.details == true) {
            // Get the admin-details element and set its display style to 'block'
            const message = document.getElementById('message') as HTMLDivElement | null;
            if (message) {
              message.style.display = 'block';
            }
          }
          console.log(response.message)


          this.router.navigate(['/attendance']);
        }
        else if (response.message == 'Your attendance has been marked') {
          this.message = response.message
          this.dialogService.setSuccessMessage(response.message);

          if (this.details == true) {
            // Get the admin-details element and set its display style to 'block'
            const message = document.getElementById('message') as HTMLDivElement | null;
            if (message) {
              message.style.display = 'block';
            }
          }


          this.router.navigate(['/attendance']);


        }
      })).subscribe()
  }




  //this.router.navigate(['/attendance']);

  onsave1() {

    this.router.navigate(['/face-recognised']);
  }

}
