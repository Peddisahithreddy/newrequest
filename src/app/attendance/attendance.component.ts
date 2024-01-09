import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  
  image="../assets/astreya-logo-white.svg"
  
  constructor(private router: Router) {}
  onsave(){

  this.router.navigate(['/mark-attendance-form']);
  }

}
