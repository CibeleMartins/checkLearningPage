import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  template: `
    <ng-lottie [options]="options" (animationCreated)="animationCreated($event)"></ng-lottie>
  `,
  styleUrls: ['./lottie.component.css']
})

export class LottieComponent {

  // @Input() lottieAnimation!: string;
  @Input() options!: AnimationOptions;

  // options: AnimationOptions = {
  //   path: `/assets/${this.lottieAnimation}`,
  // };

  animationCreated(animationItem: AnimationItem): void {
    // console.log(this.lottieAnimation)
    console.log(animationItem);
  }

}
