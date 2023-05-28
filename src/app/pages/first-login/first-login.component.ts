import { Component } from '@angular/core';
import { ContentLearningService } from 'src/app/services/ContentLearningService.service';

@Component({
  selector: 'app-first-login',
  templateUrl: './first-login.component.html',
  styleUrls: ['./first-login.component.css']
})
export class FirstLoginComponent {

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
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

    this.slides[0] = {
      id: 0,
      src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpt.quizur.com%2Flist%2Fimagens-aleatorias-HKkn&psig=AOvVaw33WtGWfFKSE9098ZioRfXL&ust=1684886023172000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOCA2diPiv8CFQAAAAAdAAAAABAE',
      title: 'First slide',
      subtitle: 'Nulla vitae elit libero, a pharetra augue mollis interdum.'
    };
    this.slides[1] = {
      id: 1,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPMVfYGA7dWDyzzgoqHv615WKQTr2pa7Yo3gGG-mOy1Q&s',
      title: 'Second slide',
      subtitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    }
    this.slides[2] = {
      id: 2,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPMVfYGA7dWDyzzgoqHv615WKQTr2pa7Yo3gGG-mOy1Q&s',
      title: 'Third slide',
      subtitle: 'Praesent commodo cursus magna, vel scelerisque nisl consectetur.'
    }
  }


onItemChange($event: any): void {
  console.log('Carousel onItemChange', $event);
}
}
