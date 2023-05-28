import { Component, Input } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent {

  @Input() editorConfig:AngularEditorConfig;
  @Input() placeholder: string;
  @Input() htmlContentValue: string;


}
