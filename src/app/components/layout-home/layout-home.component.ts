import { Component, OnInit, Output, Input } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.css']
})
export class LayoutHomeComponent implements OnInit {

  @Input() image: string | undefined;
  @Input() optionsLottie!: AnimationOptions;
  @Input() renderLogo: boolean;
  @Input() styles!: Partial<CSSStyleDeclaration>;
  
  constructor() { }

  ngOnInit(): void {
    
  }



}
