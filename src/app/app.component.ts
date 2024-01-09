import { Component } from '@angular/core';
import { DialogService } from './dialog.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'facial_recognition';
  successMessage$ = this.dialogService.successMessageAction$.pipe(
    tap((message) => {
      setTimeout(() => {
    this.dialogService.clearAllMessage();
  },2500);
})
);
  errorMessage$ = this.dialogService.errorMessageAction$;

  constructor(private dialogService: DialogService) {}

}
