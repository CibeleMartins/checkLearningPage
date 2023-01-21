import { Component, OnInit } from '@angular/core';
// import { fadeInDown, fadeInLeft } from 'ng-animate';
// import { TextAnimation } from 'ngx-teximate';

import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  poster: string = "../../../../assets/poster.svg";
  checkList: string = "";
  learnerMethod: string = "";

  sizeTitleInitialContent = false;

  constructor(private breakpointService: BreakpointObserver) {
    
  }

  ngOnInit(): void {

    this.breakpointService.observe(Breakpoints.Tablet).subscribe((result)=> {

      this. sizeTitleInitialContent = false;

      if (result.matches) {

        this.sizeTitleInitialContent = true;
      }
    })
  }

}
