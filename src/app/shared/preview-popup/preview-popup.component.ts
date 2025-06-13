import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-preview-popup',
  templateUrl: './preview-popup.component.html',
  styleUrls: ['./preview-popup.component.scss']
})
export class PreviewPopupComponent {
  @Input() personalDetails: any;
  @Input() instituteDetails: any;
  @Input() classDetails: any[] = [];
  @Input() courseDetails: any[] = [];
  @Input() images: string[] = [];
  @Input() profileImage: string = '';

  constructor(public activeModal: NgbActiveModal) {}

  confirm() {
    this.activeModal.close('confirm');
  }

  cancel() {
    this.activeModal.dismiss('cancel');
  }
}
