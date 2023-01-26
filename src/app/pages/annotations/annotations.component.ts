import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
interface AnnotationModel {
  title: string;
  date: string;
  description: string;
  annotation: string;
}

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css'],
})
export class AnnotationsComponent implements OnInit {
  @ViewChild('drawer') drawerReference!: MatDrawer;

  annotationForms!: FormGroup;

  annotation: AnnotationModel = {
    title: '',
    date: '',
    description: '',
    annotation: '',
  };

  annotationsArray: [] = [];

  viewSnackbar: boolean = false;
  messageSnackBar!: string;
  warningIcon!: string;

  ngOnInit(): void {
    this.annotationForms = new FormGroup({
      title: new FormControl(null, [Validators.required], null),
      date: new FormControl(null, [Validators.required], null),
      description: new FormControl(null, [Validators.required], null),
      annotation: new FormControl(null, [Validators.required], null),
    });
  }

  sideNavIsopened: boolean = false;

  imageIsHidden: boolean = true;
  showFiller = false;

  onAddAnnotation(event: Event) {



      if(this.annotationForms.invalid) {
        event.preventDefault()
        this.viewSnackbar = !this.viewSnackbar;
        this.messageSnackBar = 'É necessário preencher todos os campos.';
        this.warningIcon = '../../../assets//warningIcon.png';
        console.log(this.annotationForms)
      } else {
        this.viewSnackbar = !this.viewSnackbar;
        this.messageSnackBar = 'Anotação feita com sucesso!';
        this.warningIcon = '../../../assets//successIcon.png';
      }
  
  }
}


