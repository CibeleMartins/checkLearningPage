import {  Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { AnnotationService } from 'src/app/services/AnnotationService.service';
import { SnackBarFeedbackService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  @Output() dispatchOnUpdateAnnotation: EventEmitter<{annotation: AnnotationModel, id: number}> = new EventEmitter();
  userAnnotations: AnnotationModel[] = [];
  elements: string[] = [];
  indexAnnotationUpdatedInArray!: number;

  constructor(private annotationService:AnnotationService, private feedbackService: SnackBarFeedbackService) {

  }

  ngOnInit(): void {
   
      this.annotationService.getAnnotationsOfUser().subscribe({
        next: (data)=> {console.log('anotacoes do usuario', Object.values(data), Object.values(data).map((i, index) =>{ this.elements.push('container'+i.id)} )), this.userAnnotations = Object.values(data), console.log('userAnnotations no AnntationComponent', this.userAnnotations); },
        error: (e)=> console.log(e),
        complete: ()=> ''
      })
      
      this.annotationService.newAnnotationsOrRemoveAnnotation.subscribe(
        {next: (data)=> {console.log('newAnnotations chegou no AnnotationComponent',data),  this.userAnnotations.push(data.annotation), data.isUpdate ? this.userAnnotations.splice(this.indexAnnotationUpdatedInArray,1) : 0, data.isDelete ? this.userAnnotations.splice(data.index, data.amountAnnotationsDelete) : 0, console.log('userAnnotations no AnntationComponent depois de registrar mais uma', this.userAnnotations);},
        error: (e)=> console.log('erro new annotation', e),
        complete: ()=> {}}
      )
  }

  getValuesOfObject(frame: string, element: string) {
    const container = document.getElementById(element); 
    const iframeHtml = frame;
    container.innerHTML = iframeHtml;
  }

  onDeleteAnnotation(idAnnotationClicked: number, index: number) {
    this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'Realmente deseja deletar essa anotação?', icon: '../../../assets/warningIcon.png', isConfirmationDelete: true, idAnnotationClicked: idAnnotationClicked, index: index})
  }

  onUpdateAnnotation(annotation: AnnotationModel, idAnnotationClickedForEdit: number) {
    this.indexAnnotationUpdatedInArray =  this.userAnnotations.indexOf(annotation);
    this.dispatchOnUpdateAnnotation.emit({ annotation: annotation, id: idAnnotationClickedForEdit });
  }

  viewAnnotation(annotationRenderInPDF: AnnotationModel) {
    this.annotationService.openModalPdf.next({allowedOpen: true, annotation: annotationRenderInPDF})
  }

}
