import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { AnnotationService } from 'src/app/services/AnnotationService.service';

@Component({
  selector: 'app-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.css']
})
export class AnnotationComponent implements OnInit {

  @Output() dispatchOnUpdateAnnotation: EventEmitter<{annotation: AnnotationModel, id: number}> = new EventEmitter();
  userAnnotations: AnnotationModel[] = [];
  elements: string[] = [];

  constructor(private annotationService:AnnotationService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
   
      this.annotationService.getAnnotationsOfUser().subscribe({
        next: (data)=> {console.log('anotacoes do usuario', Object.values(data), Object.values(data).map((i, index) =>{ this.elements.push('container'+i.id)} )), this.userAnnotations = Object.values(data), console.log('userAnnotations no AnntationComponent', this.userAnnotations); },
        error: (e)=> console.log(e),
        complete: ()=> ''
      })
      
      this.annotationService.newAnnotations.subscribe(
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

  onDeleteAnnotation(idAnnotationClicked: number, index: number) {
    this.annotationService.deleteAnnotationOfUser(idAnnotationClicked).subscribe({
      next: (data)=> {console.log('sucesso no delete da anotação', data)},
      error: (e)=> {console.log('erro no delete da anotação', e)},
      complete: ()=> {console.log('delete de anotação completado')
      this.userAnnotations.splice(index, 1);
      }
    })
  }

  onUpdateAnnotation(annotation: AnnotationModel, idAnnotationClickedForEdit: number) {
    console.log('onUpdateAnnotation acionado no AnnotationComponent')
    this.dispatchOnUpdateAnnotation.emit({ annotation: annotation, id: idAnnotationClickedForEdit });
  }
 
}
