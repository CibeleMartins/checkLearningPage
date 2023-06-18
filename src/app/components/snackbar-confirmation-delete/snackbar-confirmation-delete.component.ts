import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { AnnotationService } from 'src/app/services/AnnotationService.service';
import { SnackBarFeedbackService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-snackbar-confirmation-delete',
  templateUrl: './snackbar-confirmation-delete.component.html',
  styleUrls: ['./snackbar-confirmation-delete.component.css']
})
export class SnackbarConfirmationDeleteComponent {
constructor( public sbRef: MatSnackBarRef<SnackbarConfirmationDeleteComponent>,
  @Inject(MAT_SNACK_BAR_DATA) public data: any, private feedbackService: SnackBarFeedbackService, private annotationService: AnnotationService){}


  close() {
    this.feedbackService.closeSnackbar();
  }

  confirmDeleteOfAnnotation() {
      this.annotationService.deleteAnnotationOfUser(this.data[2]).subscribe({
      next: (data)=> {console.log('sucesso no delete da anotação', data)},
      error: (e)=> {this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'Erro no serviço de anotações ao deletar', icon: '../../../assets/warningIcon.png' })},
      complete: ()=> {
      this.annotationService.newAnnotationsOrRemoveAnnotation.next({isDelete: true, index: this.data[3] , amountAnnotationsDelete: 1});
      this.close()

      }
    })

    // setTimeout(()=> {
    //   this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'Anotação deletada com sucesso!', icon: '../../../assets//successIcon.png', isConfirmationDelete: false })
    // }, 1500)
  }

  abortDelete(){
    this.close()
  }
}
