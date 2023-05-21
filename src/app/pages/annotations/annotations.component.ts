import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { Store } from '@ngrx/store';
import { Subscription, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css'],
})
export class AnnotationsComponent implements OnInit {
  @ViewChild('drawer') drawerReference!: MatDrawer;

  annotationForms!: FormGroup;
  annotationsArray: {
    idUser: number;
    title: string;
    date: string;
    description: string;
    annotation: string;
    color: string;
  }[] = [];

  annotationColor: string;

  viewSnackbar: boolean = false;
  messageSnackBar!: string;
  warningIcon!: string;
  
  sideNavIsopened: boolean = false;

  imageIsHidden: boolean = true;
  showFiller = false;
  public routerreuse: any;
  constructor(private authService: AuthService) {
   
  }

  authBoolean: boolean = false;

  ngOnInit(): void {

    this.annotationForms = new FormGroup({
      title: new FormControl('sdgsdgsdgs', [Validators.required], null),
      date: new FormControl('sdgsdgsdgs', [Validators.required], null),
      description: new FormControl(
        'dsfsdfsfsfsdfsd',
        [Validators.required],
        null
      ),
      annotation: new FormControl(
        'sdfsdfsdsdgsdgsdg',
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
