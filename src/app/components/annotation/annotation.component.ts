import { Component, OnInit } from '@angular/core';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { UserService } from 'src/app/services/UserService.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  userAnnotations: AnnotationModel[] = [];
  elements: AnnotationModel[] = [];
  
  constructor(private userService:UserService) {

  }

  ngOnInit(): void {
      this.userAnnotations = this.userService.annotations 

      this.userService.getAnnotationsOfUser().subscribe({
        next: (data)=> {console.log('anotacoes do usuario', Object.values(data).map(i => this.elements.push(i) ))},
        error: (e)=> console.log(e),
        complete: ()=> ''
      })
  }

  getValuesOfObject(frame: string, element: string) {
    const container = document.getElementById(element); 
    const iframeHtml = frame;
    container.innerHTML = iframeHtml;
  }


 
}
