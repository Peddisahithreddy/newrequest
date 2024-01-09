import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-details',
  templateUrl: './calendar-details.component.html',
  styleUrls: ['./calendar-details.component.css']
})
export class CalendarDetailsComponent {
  boy_icon="../assets/user-icon.png"
  details: boolean = false;
  constructor(private router: Router) {}
  onsave2(){

  this.router.navigate(['/calendar-details']);
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
