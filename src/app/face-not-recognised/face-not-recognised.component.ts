import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-face-not-recognised',
  templateUrl: './face-not-recognised.component.html',
  styleUrls: ['./face-not-recognised.component.css']
})
export class FaceNotRecognisedComponent implements OnInit{
  image="../assets/astreya-logo-white.svg"
  img1="../assets/face_not_recognised.png"
  timeout!: any;
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.timeout = setTimeout(() => {
      this.router.navigate(['/attendance']);
    }, 10000);
  }
  onsave(){
    clearTimeout(this.timeout);
    this.router.navigate(['/user-form']);
    }


}
