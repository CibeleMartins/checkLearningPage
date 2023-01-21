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

  sizeTitleInitialContent = '50%';
  size2 = '100px';

  constructor(private breakpointService: BreakpointObserver) {}

  ngOnInit(): void {
    this.breakpointService
      .observe([Breakpoints.Tablet, Breakpoints.XSmall])
      .subscribe((result) => {
        this.sizeTitleInitialContent = '50%';
        this.size2 = '100px';

        if (result.breakpoints[Breakpoints.Tablet]) {
          this.sizeTitleInitialContent = '0%';
        }

        if (result.breakpoints[Breakpoints.XSmall]) {
          this.size2 = '50px';
        }
      });
  }
}
