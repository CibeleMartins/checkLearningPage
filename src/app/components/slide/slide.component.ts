import { Component, ViewChild, Input } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent {
  
  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});
  @Input()  frames: string[] = [];
@Input() renderSlide!: boolean;
  ngOnInit() {
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
