import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-contact-popup',
  templateUrl: './add-contact-popup.component.html',
  styleUrls: ['./add-contact-popup.component.scss']
})
export class AddContactPopupComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  contactForm: FormGroup;
  images: string[] = [];
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  constructor(private fb: FormBuilder,
    public activeModal: NgbActiveModal
  ) {
    this.contactForm = this.fb.group({
      programTitle: ['', Validators.required],
      instituteName: ['', Validators.required],
      phoneNo1: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      phoneNo2: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      selectYear: [false],
    });
  }

  handleImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      const files = Array.from(input.files);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
          this.images.push(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  handleFile(file: any) {
    const selectedFile: File = file;
    
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(file);
      this.images.push(imageUrl); // Add files to the array
      }
   
  }

  closeModal() {
    this.open = false;
    this.activeModal.close();
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log(this.contactForm.value);
      this.closeModal();
    }
  }
  
}
