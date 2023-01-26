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

  ngOnInit(): void {
    this.annotationForms = new FormGroup({
      title: new FormControl(null, [Validators.required], null),
      date: new FormControl(null, [Validators.required], null),
      decription: new FormControl(null, [Validators.required], null),
      annotation: new FormControl(null, [Validators.required], null),
    });
  }

  sideNavIsopened: boolean = false;

  imageIsHidden: boolean = true;
  showFiller = false;

  onAddAnnotation() {}
}

// //HOW TO MAKE INTERFACE IN ANGULAR 14?
// {
//     "courseId": 1,
//     "userIds": [
//       "46071424",
//       "46076456",
//     ],
//     "endDate": "2022-03-29"
// }:

// interface IModel {
//   courseId: number;
//   userIds: string[];
//   endDate: string;
// }

// //Source: https://stackoverflow.com/questions/70247056
