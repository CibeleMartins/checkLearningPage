import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/UserService.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  userAnnotations: {
    idUser: number;
    title: string;
    date: string;
    description: string;
    annotation: string;
    color: string;
  }[] = [];

  constructor(private userService: UserService) {

    console.log(this.userAnnotations)
    console.log(this.userService.getAnnotationsUser())
  }

  ngOnInit(): void {
    console.log(this.userService.getAnnotationsUser())
     this.userAnnotations = this.userService.getAnnotationsUser();
     console.log(this.userAnnotations)
  }

}
