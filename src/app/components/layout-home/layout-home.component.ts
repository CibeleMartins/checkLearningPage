import { Component, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-layout-home',
  templateUrl: './layout-home.component.html',
  styleUrls: ['./layout-home.component.css']
})
export class LayoutHomeComponent implements OnInit {

  @Input() image: string | undefined;

  fluidSizePoster = false;

  constructor() { }

  ngOnInit(): void {

  }

}
