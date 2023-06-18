import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/Auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { Router } from '@angular/router';
import { AnnotationService } from 'src/app/services/AnnotationService.service';
import { SnackBarService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css'],
})
export class AnnotationsComponent implements OnInit {
  @ViewChild('drawer') drawerReference!: MatDrawer;

  annotationForms!: FormGroup;
  sideNavIsopened: boolean = false;
  imageIsHidden: boolean = true;
  changeIconFormAnnotation: boolean = false;
  idAnnotationUpdated!: number;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '50vh',
    minHeight: '0',
    maxHeight: 'auto',
    width: '50%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' }
    ],
  };

  constructor(private feedbackService: SnackBarService, private annotationService: AnnotationService, private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {

    this.annotationForms = new FormGroup({
      title: new FormControl('', [Validators.required], null),
      annotation: new FormControl(
        '',
        [Validators.required],
        null
      ),
    });
  }

  onAddAnnotation(event: Event) {
    if (this.annotationForms.status === "INVALID") {
      event.preventDefault();
      console.log(this.annotationForms);
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'É necessário preencher todos os campos.', icon:'../../../assets//warningIcon.png'})

    } else {
      let annotation: AnnotationModel = {
        title: this.annotationForms.get('title').value,
        annotation: this.annotationForms.get('annotation').value,
      };

      this.annotationService.registerAnnotationUser(annotation).subscribe({
        next: (data: any) => { this.annotationService.newAnnotations.next({ annotation: data, isUpdate: false }) },
        error: (e: any) => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: e.message, icon:'../../../assets/warningIcon.png'})

        },
        complete: () => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'Anotação registrada com sucesso!', icon:'../../assets/successIcon.png'})
        }
      });

      this.annotationForms.reset();

    }
  }

  onUpdateAnnotationInPage() {

    if (this.annotationForms.status === "INVALID") {
      this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'É necessário preencher todos os campos.', icon:'../../../assets//warningIcon.png'})

    } else {
      let annotation: AnnotationModel = {
        title: this.annotationForms.get('title').value,
        annotation: this.annotationForms.get('annotation').value,
      };
      this.annotationService.updateAnnotationOfUser(annotation, this.idAnnotationUpdated).subscribe({
        next: (data: any) => {this.annotationService.newAnnotations.next({ annotation: data, isUpdate: true }) },
        error: (e: any) => { this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: e.error.message, icon:'../../../assets//warningIcon.png'}), console.log('erro no update da anotação', e) },
        complete: () => {
          this.feedbackService.sendValuesForSnackbarFeedbackComponent.next({viewSnackbar: true, message: 'Anotação atualizada com sucesso!', icon:'../../assets/successIcon.png'})
          console.log('update de anotação completado')
          this.annotationForms.reset();
        }
      })
    }
  }

  receiveUpdateAnnotationInPage(event: { annotation: AnnotationModel, id: number }) {
    this.changeIconFormAnnotation = true;
    this.idAnnotationUpdated = event.annotation.id;
    this.annotationForms.setValue({
      title: event.annotation.title,
      annotation: event.annotation.annotation,
    })
  }

  // ngOnDestroy() {
  //   this.authService.logout();
  // }

}
