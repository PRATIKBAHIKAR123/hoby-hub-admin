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

  @Input() profileDetails: any;
  @Output() submit = new EventEmitter<any>();

  contactForm: FormGroup;
  isSubmitting = false;
  wasSubmitted = false;
  useSameNumber = false;
  useProfileDetails = false;
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
      tutorFirstName: ['', Validators.required],
      tutorLastName: ['', Validators.required],
      tutorEmailID: ['', [Validators.required, Validators.email]],
      tutorPhoneNo: ['', [Validators.required, Validators.minLength(8)]],
      tutorCountryCode: ['+91'],
      thatsappNo: [''],
      whatsappCountryCode: ['+91'],
      tutorIntro: [''],
      profilePhoto: ['']
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

  onUseProfileDetailsChange(event: Event) {
    const checked = (event as any).target.checked;
    this.useProfileDetails = checked;
    if (checked && this.profileDetails) {
      this.contactForm.patchValue({
        tutorFirstName: this.profileDetails.firstName,
        tutorLastName: this.profileDetails.lastName,
        tutorEmailID: this.profileDetails.emailId,
        tutorPhoneNo: this.profileDetails.phoneNumber,
        thatsappNo: this.profileDetails.phoneNumber,
        whatsappCountryCode: '+91'
      });
    } else if (!checked) {
      this.contactForm.patchValue({
        tutorFirstName: '',
        tutorLastName: '',
        tutorEmailID: '',
        tutorPhoneNo: '',
        thatsappNo: '',
        whatsappCountryCode: '+91'
      });
    }
  }

  onUseSameNumberChange(event: Event) {
    const checked = (event as any).target.checked;
    this.useSameNumber = checked;
    if (checked) {
      this.contactForm.patchValue({
        thatsappNo: this.contactForm.get('tutorPhoneNo')?.value
      });
    }
  }

  onPhoneChange(event: any, field: string) {
    this.contactForm.get(field)?.setValue(event.target.value);
    if (this.useSameNumber && field === 'tutorPhoneNo') {
      this.contactForm.get('thatsappNo')?.setValue(event.target.value);
    }
  }

  onFileChange(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.images = [e.target.result];
        this.contactForm.get('profilePhoto')?.setValue(e.target.result);
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onSubmit() {
    this.wasSubmitted = true;
    if (this.contactForm.invalid) return;
    this.isSubmitting = true;
    const data = {
      ...this.contactForm.value,
      id: Date.now().toString(),
      contactType: { primary: true, secondary: false, billing: false }
    };
    this.submit.emit(data);
    this.isSubmitting = false;
    this.activeModal.close();
  }

  onCancel() {
    this.activeModal.dismiss();
  }
}
