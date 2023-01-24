import { Component, Inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { SnackBarService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-snackbar-feedback',
  templateUrl: './snackbar-feedback.component.html',
  styleUrls: ['./snackbar-feedback.component.css']
})
export class SnackbarFeedbackComponent {

  constructor(
    public sbRef: MatSnackBarRef<SnackbarFeedbackComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any, private feedbackService: SnackBarService
  ) {}


  close() {
    this.feedbackService.closeSnackbar();
  }
}
