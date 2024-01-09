import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser-form',
  templateUrl: './adduser-form.component.html',
  styleUrls: ['./adduser-form.component.css']
})
export class AdduserFormComponent {
  constructor(private router: Router) {}
  onsave(){

    this.router.navigate(['/user']);
    }

}
