import { Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/Auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { Router } from '@angular/router';
import { AnnotationComponent } from 'src/app/components/annotation/annotation.component';
import { AnnotationService } from 'src/app/services/AnnotationService.service';
import { UserService } from 'src/app/services/UserService.service';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css'],
})
export class AnnotationsComponent implements OnInit {
  @ViewChild('drawer') drawerReference!: MatDrawer;

  annotationForms!: FormGroup;
  viewSnackbar: boolean = false;
  messageSnackBar!: string;
  warningIcon!: string;
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

  constructor(private userService: UserService, private annotationService: AnnotationService, private router: Router, private authService: AuthService) {

  }
  ngOnInit(): void {

    this.annotationForms = new FormGroup({
      title: new FormControl('', [Validators.required], null),
      date: new FormControl('', [Validators.required], null),
      annotation: new FormControl(
        '',
        [Validators.required],
        null
      ),
    });
  }

  onAddAnnotation(event: Event) {
    if (this.annotationForms.invalid) {
      event.preventDefault();
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'É necessário preencher todos os campos.';
      this.warningIcon = '../../../assets//warningIcon.png';
      console.log(this.annotationForms);

    } else {
      this.viewSnackbar = !this.viewSnackbar;
      this.messageSnackBar = 'Anotação feita com sucesso!';
      this.warningIcon = '../../../assets//successIcon.png';

      let annotation: AnnotationModel = {
        title: this.annotationForms.get('title').value,
        date: this.annotationForms.get('date').value,
        annotation: this.annotationForms.get('annotation').value,
      };

      this.annotationService.registerAnnotationUser(annotation).subscribe({
        next: (data: any) => { console.log('anotação registrada', data), this.annotationService.newAnnotations.next({annotation: data, isUpdate: false}) },
        error: (e: any) => console.log(e),
        complete: () => console.log('complete')
      });

      this.annotationForms.reset();

    }
  }

  onUpdateAnnotationInPage() {
    let annotation: AnnotationModel = {
      title: this.annotationForms.get('title').value,
      date: this.annotationForms.get('date').value,
      annotation: this.annotationForms.get('annotation').value,
    };
    console.log('id de anotaçao atualizada que vai ser enviado na requisição', this.idAnnotationUpdated)
    this.annotationService.updateAnnotationOfUser(annotation, this.idAnnotationUpdated).subscribe({
      next: (data: any)=> {console.log('sucesso no update da anotação', data), this.annotationService.newAnnotations.next({annotation: data, isUpdate: true})},
      error: (e: any)=> {console.log('erro no update da anotação', e)},
      complete: ()=> {console.log('update de anotação completado')
      this.annotationForms.reset();
      }
    })
  }

  receiveUpdateAnnotationInPage(event: { annotation: AnnotationModel, id: number }) {
    var dateAnnotation = event.annotation.date.slice(0, 10);
    var partsOfDateAnnotation = dateAnnotation.split("/");
    var newDate = partsOfDateAnnotation[2] + "-" + partsOfDateAnnotation[1] + "-" + partsOfDateAnnotation[0];
    this.changeIconFormAnnotation = true;
    this.idAnnotationUpdated = event.annotation.id;
    this.annotationForms.setValue({
      title: event.annotation.title,
      date: newDate,
      annotation: event.annotation.annotation,
    })
  }

  // ngOnDestroy() {
  //   this.authService.logout();
  // }

}
