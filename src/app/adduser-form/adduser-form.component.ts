import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserserviceService } from '../user.service';
import { RequestService } from '../request.service';

@Component({
  selector: 'app-adduser-form',
  templateUrl: './adduser-form.component.html',
  styleUrls: ['./adduser-form.component.css']
})
export class AdduserFormComponent {
  name!: string;
  id!: string;
  contactNumber!: string;
  datajson: any;
  request: any;
  jobposition!: string;
  email!: string;
  gender!: string;
  age!: number;
  constructor(private router: Router,private userService: UserserviceService,
    private requestService: RequestService) {}
  onsave(){
    this.datajson = {
      emp_id: this.id,
      emp_name: this.name,
      job_position: this.jobposition,
      email: this.email,
      gender: this.gender,
      age: this.age,
      contact_no: this.contactNumber
    };

    this.request = {
      emp_id: this.id,
      emp_name: this.name,
      date_from: '2024-12-1',
      date_to: '2024-12-1',
      approved_by: this.name,
      manager: this.name,
      request_type: 'adding user',
      email: this.name
    };
    this.userService.createUser(this.datajson).subscribe((response) => {
      console.log(response)
    })
    this.requestService.post_request(this.request).subscribe((response) => {console.log(response)})

    this.router.navigate(['/user']);
    }

}
