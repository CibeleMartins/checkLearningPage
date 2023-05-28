import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as Aos from 'aos';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  poster: string = '../../../../assets/poster.svg';
  checkList: string = '';
  learnerMethod: string = '../../../../assets/howToLearn.svg';
  renderAnimatedText: boolean=true;

 options: AnimationOptions = {
    path: '/assets/lottie-man-fly.json',
  };

  optionsCheckRegistryLearn: AnimationOptions = {
    path: '/assets/lottie-check-registry-learn.json',
  };

    styles: Partial<CSSStyleDeclaration> = {
    maxWidth: '100vh',
    width: '80vh',
    paddingRight: '7%',
  };
  constructor(private route: Router) {}

  ngOnInit(): void {
    Aos.init();
  }

  navigateLogin() {
    this.route.navigate(['/login'])
  }

  navigateToRegistration() {
    this.route.navigate(['/cadastro'])
  }

  backToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }
}
