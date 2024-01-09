import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrls: ['./edit-details.component.css']
})
export class EditDetailsComponent {
  constructor(private router: Router) {}
  onsave(){

  this.router.navigate(['/user']);
  }
  


}
