import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

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
  showFiller = false;

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
  editorValue: string;
  constructor(private authService: AuthService) {

  }
  ngOnInit(): void {
    console.log('editor value: ', this.editorValue)
    this.annotationForms = new FormGroup({
      title: new FormControl('', [Validators.required], null),
      date: new FormControl('', [Validators.required], null),
      annotation: new FormControl(
        this.editorValue,
        [Validators.required],
        null
      ),
      color: new FormControl('', null),
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

      interface AnnotationModel {
        idUser: number;
        title: string;
        date: string;
        description: string;
        annotation: string;
        color: string;
      }
      let id = 0;


      let annotation: AnnotationModel = {
        idUser: id++,
        title: this.annotationForms.get('title').value,
        date: this.annotationForms.get('date').value,
        description: this.annotationForms.get('description').value,
        annotation: this.annotationForms.get('annotation').value,
        color: this.annotationForms.get('color').value
      };


      // this.userService.registerAnnotationUser(annotation);
      this.annotationForms.reset();

    }
  }

  // ngOnDestroy() {
  //   this.authService.logout();
  // }

}
