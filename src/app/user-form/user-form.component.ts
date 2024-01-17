import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  name!: string;
  id!: string;
  job!: string;
  email!: string;
  gender!: string;
  age!: number;
  role!: string;
  contactNumber!: string;
  constructor(private router: Router,private userService: UserserviceService) {}
  onSave(){
    const datajson = {
      'emp_id':this.id,
      'emp_name':this.name,
      'job_position':this.job,
      'email':this.email,
      'gender':this.gender,
      'age':this.age,
      'role':this.role,
      'contact_no':this.contactNumber
    }
    console.log(datajson)
    this.userService.createUser(datajson).subscribe((response) => {console.log(response)})
    this.router.navigate(['/attendance']);
    }

}
