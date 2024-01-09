import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MyserviceService } from '../myservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  admin_id!: number;

  logo = "../assets/astreya-logo.jpeg"
  // username : string = '';
  // password : string = '';
  // constructor(private router: Router, private authService: MyserviceService) {}

  // onsave() {
  //   // Perform your authentication logic here.
  //   this.authService.login(this.username, this.password).subscribe((response) => {
  //     // Handle the response from the backend, e.g., set user authentication status, navigate to another page, etc.
  //     console.log(response);
  //     this.router.navigate(['/welcome-admin']);
  //   });

  constructor(private router: Router, private myService: MyserviceService) { }
  onsave() {
    this.myService.login(this.username, this.password).subscribe((response) => {
      this.admin_id = Number(response)
      console.log("admin_id is :",this.admin_id)

      this.router.navigate(['/welcome-admin'],{state:{data:this.admin_id}});
    })


  }




}




