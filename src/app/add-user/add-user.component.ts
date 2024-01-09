import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  cap_img="../assets/capture.jpeg"
  boy_icon="../assets/user-icon.png"
  constructor(private router: Router) {}
  onsave(){

    this.router.navigate(['/adduserform']);
    }

}
