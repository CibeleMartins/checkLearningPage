import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AnnotationModel } from 'src/app/interfaces/AnnotationModel.model';
import { AnnotationService } from 'src/app/services/AnnotationService.service';
import { SnackBarFeedbackService } from 'src/app/services/SnackbarFeedback.service';

@Component({
  selector: 'app-modal-pdf',
  templateUrl: './modal-pdf.component.html',
  styleUrls: ['./modal-pdf.component.css']
})
export class ModalPdfComponent implements OnInit {

  @ViewChild("outsideElement", {static: true}) outsideElement : ElementRef;
  @ViewChild('modalView', {static: true}) modalView$ : ElementRef;
  openModal: boolean = false;
  annotationRenderInPDF: AnnotationModel
  constructor(private annotationService: AnnotationService, private feedbackService: SnackBarFeedbackService){

  }

  ngOnInit(): void {
    
    this.annotationService.openModalPdf.subscribe({
      
      next: (data)=> {console.log('pode abrir o modal pdf', data.allowedOpen), this.openModal = data.allowedOpen, this.annotationRenderInPDF = data.annotation }
    })
  }

  closeModal() {
    this.openModal = false;
  }
}
