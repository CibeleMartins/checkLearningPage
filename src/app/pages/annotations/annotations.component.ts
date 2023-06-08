import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { AuthService } from 'src/app/services/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { UserService } from 'src/app/services/UserService.service';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { Router } from '@angular/router';
import { AnnotationComponent } from 'src/app/components/annotation/annotation.component';

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
  htmlContent: string = '';
  constructor(private userService: UserService, private router: Router, private authService: AuthService) {

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

      const date = new Date(this.annotationForms.get('date').value);

      let annotation: AnnotationModel = {
        title: this.annotationForms.get('title').value,
        date: this.annotationForms.get('date').value,
        annotation: this.annotationForms.get('annotation').value,
      };

      this.userService.registerAnnotationUser(annotation).subscribe({
        next: (data) => { console.log('anotação registrada', data) },
        error: (e) => console.log(e),
        complete: () => console.log('complete')
      });

      this.userService.getAnnotationsOfUser().subscribe({
        next: (data) => {
          console.log('mandou novo array de anotações para AnnotationComponente')
          this.userService.newAnnotations.next(annotation)
        },
        error: (e) => console.log(e),
        complete: () => ''
      })

      this.annotationForms.reset();

    }
  }

  // ngOnDestroy() {
  //   this.authService.logout();
  // }

}
