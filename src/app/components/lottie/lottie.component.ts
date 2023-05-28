import { Component, Input } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-lottie',
  template: `
    <ng-lottie [options]="options" [styles]="styles" (animationCreated)="animationCreated($event)"></ng-lottie>
  `,
  styleUrls: ['./lottie.component.css']
})

export class LottieComponent {


  @Input() options!: AnimationOptions;
  @Input() styles!: Partial<CSSStyleDeclaration>;



  animationCreated(animationItem: AnimationItem): void {
    // console.log(this.lottieAnimation)
    console.log(animationItem);
  }

}
