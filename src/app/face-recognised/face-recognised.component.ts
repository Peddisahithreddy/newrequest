import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-recognised',
  templateUrl: './face-recognised.component.html',
  styleUrls: ['./face-recognised.component.css']
})
export class FaceRecognisedComponent {
  image="../assets/astreya-logo-white.svg"

  img="../assets/face_recognised.jpg"
  constructor(private router: Router) {}
  onsave(){

  this.router.navigate(['/face-not-recognised']);
  }
  onsave1(){

    this.router.navigate(['/employee-login']);
    }

 
}

