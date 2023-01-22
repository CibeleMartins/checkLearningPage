import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as Aos from 'aos';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  poster: string = '../../../../assets/poster.svg';
  checkList: string = '';
  learnerMethod: string = '../../../../assets/howToLearn.svg';


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
}
