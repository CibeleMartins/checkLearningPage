import { Component } from '@angular/core';
import { ContentLearningService } from 'src/app/services/ContentLearningService.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {

  textAnimated: {}[] = [
    "Registrar",
    "Checar",
    "O SEU processo de desenvolvimento de uma habilidade nova",
    "Ou até mesmo uma habilidade que você já tenha, mas que deseja aprimorar",
  ];

  elements: string[] = ['container0', 'container1', 'container2', 'container3']
  constructor(private contentLearningService: ContentLearningService) {

  }

  getValuesOfObject(frame: string, element: string) {
    const container = document.getElementById(element); 
    const iframeHtml = frame;
    container.innerHTML = iframeHtml;
  }
  

  ngOnInit() {
    this.contentLearningService.getTedTalksFirstLogin().subscribe({
      next: (data) => { data.map((i: any, index: number)=> this.getValuesOfObject(i.embedHtml, this.elements[index]))},
      error: (e) => console.log(e),
      complete: () => console.log('tedtalks carregados')
    })
  }

}
