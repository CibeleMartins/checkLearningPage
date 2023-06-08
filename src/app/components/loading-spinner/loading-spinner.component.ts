import { Component } from '@angular/core';
import { LoaderService } from 'src/app/services/Loader.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {
  constructor(public loader: LoaderService) { }
}
