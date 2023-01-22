import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

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
    
  }

  navigateLogin() {
    this.route.navigate(['/login'])
  }
}
