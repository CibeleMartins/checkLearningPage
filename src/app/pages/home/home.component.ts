import { Component, OnInit } from '@angular/core';
// import { fadeInDown, fadeInLeft } from 'ng-animate';
// import { TextAnimation } from 'ngx-teximate';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  poster: string = '../../../../assets/poster.svg';
  checkList: string = '';
  learnerMethod: string = '';
  poster2: string = '../../../../assets/poster.svg';

  // props css for elements
  fontSizeTitle = '50px';
  sizeTitleInitialContent = '50%';


  constructor(private breakpointService: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Tablet, Breakpoints.XSmall])
      .subscribe((result) => {
        this.sizeTitleInitialContent = '50%';
        this.fontSizeTitle = '50px';

        if (result.breakpoints[Breakpoints.Tablet]) {
          
          this.fontSizeTitle = '10px';
          this.sizeTitleInitialContent = '0%';
        }

        if (result.breakpoints[Breakpoints.XSmall]) {
          this.fontSizeTitle = '20px';
        }
      });
  }
}
