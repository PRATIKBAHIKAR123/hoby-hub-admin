import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddContactPopupComponent } from 'src/app/shared/add-contact-popup/add-contact-popup.component';
import { AddLocationPopupComponent } from 'src/app/shared/add-location-popup/add-location-popup.component';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent {
  modelref: any;
  showClassDetails = false;
  files: File[] = [];
  images: string[] = [];
  constructor(private modalService: NgbModal) {}
  
  handleFile(file: File) {
    console.log('File selected:', file);
    const selectedFile: File = file;
    
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(file);
      this.images.push(imageUrl); // Add files to the array
      }
   
  }
  removeImage(index: number) {
    this.files.splice(index, 1); // Remove image from array
  }

  openLocationPopup() {
    this.modalService.open(AddLocationPopupComponent, {
      size: 'lg',   // Large modal
      centered: true,
      backdrop: 'static'  // Prevent closing when clicking outside
    });
  }

  openContactPopup() {
    this.modalService.open(AddContactPopupComponent, {
      size: 'lg',   // Large modal
      centered: true,
      backdrop: 'static'  // Prevent closing when clicking outside
    });
  }


  openDetailsOptionsModal(modal: any) {
    this.modelref = this.modalService.open(modal, {  centered: true });
  }

  selectClassDetails() {
    this.showClassDetails=true;
    this.closeModal();
  }

  closeModal() {
    this.modelref.close();
  }
}
