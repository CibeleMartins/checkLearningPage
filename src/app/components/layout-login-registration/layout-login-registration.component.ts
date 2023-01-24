import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { SnackBarService } from 'src/app/services/SnackbarFeedback.service';

// import {
//   MatSnackBar,
//   MatSnackBarHorizontalPosition,
//   MatSnackBarVerticalPosition,
// } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout-login-registration',
  templateUrl: './layout-login-registration.component.html',
  styleUrls: ['./layout-login-registration.component.css'],
})
export class LayoutLoginRegistrationComponent implements OnInit, OnChanges {
  @Input() viewSnackbar!: boolean;

  constructor(private feedbackService: SnackBarService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log(changes);
    // console.log(this.viewSnackbar);
    if (this.viewSnackbar) {
      this.feedbackService.openSnackBar(null, null, null, "Algum campo do formulário inválido.")
  
    }
  }
}
