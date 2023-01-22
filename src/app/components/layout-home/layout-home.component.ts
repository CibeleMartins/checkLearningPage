import { Component, OnInit, Output, Input } from '@angular/core';

import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.css']
})
export class LayoutHomeComponent implements OnInit {

  @Input() image: string | undefined;
  @Input() image2: string | undefined;

  fluidSizePoster = false;

  constructor(private breakpointService: BreakpointObserver) { }

  ngOnInit(): void {

    this.breakpointService.observe([Breakpoints.Handset, Breakpoints.Tablet]).subscribe((result)=> {

      if(result.breakpoints[Breakpoints.Tablet]) {
          this.fluidSizePoster = true;
      }
    })
  }

}
