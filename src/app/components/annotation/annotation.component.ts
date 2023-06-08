import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { UserService } from 'src/app/services/UserService.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  userAnnotations: AnnotationModel[] = [];
  elements: string[] = [];
  refreshComponent: boolean;
  constructor(private userService:UserService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
   
      this.userService.getAnnotationsOfUser().subscribe({
        next: (data)=> {console.log('anotacoes do usuario', Object.values(data), Object.values(data).map((i, index) =>{ this.elements.push('container'+i.id)} )), this.userAnnotations = Object.values(data), console.log('userAnnotations no AnntationComponent', this.userAnnotations); },
        error: (e)=> console.log(e),
        complete: ()=> ''
      })
      
      this.userService.newAnnotations.subscribe(
        {next: (data)=> {console.log('newAnnotations chegou no AnnotationComponent',data),  this.userAnnotations.push(data), console.log('userAnnotations no AnntationComponent depois de registrar mais uma', this.userAnnotations);},
        error: (e)=> console.log('erro new annotation', e),
        complete: ()=> {}}
      )
  }

  getValuesOfObject(frame: string, element: string) {
    const container = document.getElementById(element); 
    const iframeHtml = frame;
    container.innerHTML = iframeHtml;
  }


 
}
