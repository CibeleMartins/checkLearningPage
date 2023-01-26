import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.css']
})
export class AnnotationsComponent {

  @ViewChild('drawer') drawerReference!: MatDrawer;

  sideNavIsopened: boolean = false;

  imageIsHidden: boolean = true;
  showFiller = false;

}
