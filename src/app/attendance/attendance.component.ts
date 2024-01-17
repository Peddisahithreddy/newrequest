import { Component,ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AttendanceService } from '../attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent {
  @ViewChild('video') videoElement!: ElementRef;

  image="../assets/astreya-logo-white.svg"
  emp_id!: string;
  url!: string;


  constructor(private router: Router,private attendanceService: AttendanceService) {}
  onsave(){
    const video = this.videoElement.nativeElement;

try {
  // Define an async function to use await
  const initializeCamera = async () => {
    try {
      // Wait for the camera access
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Assign the stream to the video element
      video.srcObject = stream;

      // Wait for the video to be loaded (metadata loaded)
      await video.play();

      // Create a canvas and draw the current video frame onto it
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        // Capture the current video frame as base64-encoded JPEG image
        const imageData = canvas.toDataURL('image/jpeg');

        // Send the image data to the Python backend
        // this.http.post(`${this.apiUrl}/recognize-face`, { imageData }).subscribe((response) => {
        //   // Handle the response from the Python backend if needed
        //   console.log(response);
        // });

        // Log the base64-encoded image data
        console.log(imageData);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  // Call the async function
  initializeCamera();
} catch (error) {
  console.error('Error accessing camera:', error);
}

    this.attendanceService.post_attendance(this.emp_id).subscribe((response) => {
      console.log("response of attendance service is :",response)
      if (response.message == "Employee not found"){
        console.log("inside employee not found")
        this.router.navigate(['/face-not-recognised']);
      }

      else{this.router.navigate(['/mark-attendance-form'])}
      // let imageDetails ={
        // key1: this.url,

    // }
      // this.router.navigate(['/mark-attendance-form'],{
      //   queryParams: imageDetails
      // })

    })


  }

}
