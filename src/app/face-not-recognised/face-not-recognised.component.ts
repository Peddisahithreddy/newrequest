import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-face-not-recognised',
  templateUrl: './face-not-recognised.component.html',
  styleUrls: ['./face-not-recognised.component.css']
})
export class FaceNotRecognisedComponent {
  image="../assets/astreya-logo-white.svg"
  img1="../assets/face_not_recognised.png"
  constructor(private router: Router) {}
  onsave(){

    this.router.navigate(['/popup']);
    }


}
