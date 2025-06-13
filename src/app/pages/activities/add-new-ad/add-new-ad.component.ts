import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, ClassCourseDetails, Contact, LocationData, SubCategory } from './activity.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ActivityService } from 'src/app/services/activity.service';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { AddContactPopupComponent } from '../add-contact-popup/add-contact-popup.component';
import { AddLocationPopupComponent } from '../add-location-popup/add-location-popup.component';
import { CropImagePopupComponent } from 'src/app/shared/crop-image-popup/crop-image-popup.component';
import { PreviewPopupComponent } from 'src/app/shared/preview-popup/preview-popup.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-new-ad',
  templateUrl: './add-new-ad.component.html',
  styleUrls: ['./add-new-ad.component.scss']
})
export class AddNewAdComponent {
  @ViewChild('profileImageInput') profileImageInput!: ElementRef;
  @ViewChild('fileInput') fileInput!: ElementRef;
  @ViewChild('addDetailsmodal') addDetailsmodal!: any;

  // Forms
  personalForm!: FormGroup;
  instituteForm!: FormGroup;
  classForm!: FormGroup;
  courseForm!: FormGroup;

  classSubcategories:any = [];
courseSubcategories:any = [];

  // State variables
  isLoading = false;
  activeAccordion = 'item-0';
  profileImagePreview: string | null = null;
  images: File[] = [];
  imageUrls: string[] = [];
  selectedThumbnailIndex: number | null = null;
  categories: Category[] = [];
    subcategories: SubCategory[] = [];
  savedLocations: LocationData[] = [];
  savedContacts: Contact[] = [];
  showClassFields = false;
  showCourseFields = false;
  isOpen = false;
  isSuccessPopupOpen = false;
  isPreviewOpen = false;
  isDeleteOpen = false;
  isLocationPopupOpen = false;
  isContactPopupOpen = false;
  username = '';
  deleteMessage = '';
  editingIndex: number | null = null;
  isCropperOpen = false;
  tempImageUrl: string | null = null;

  completedSections = {
    personalDetails: false,
    instituteDetails: false,
    classDetails: false
  };

  // Form data
  classDetailsData: ClassCourseDetails[] = [];
  courseDetailsData: ClassCourseDetails[] = [];
  personalDetailsData: any = null;
  instituteDetailsData: any = null;

  weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  yearsList: number[] = [];

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private activityService: ActivityService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
      const currentYear = new Date().getFullYear();
  for (let year = currentYear; year >= 1950; year--) {
    this.yearsList.push(year);
  }
    this.initializeForms();
  }

  ngOnInit() {
    this.loadCategories();
    this.loadSubCategories();
    this.loadSavedData();
      this.route.paramMap.subscribe(params => {
    const id = params.get('id');
    if (id) {
      this.fetchActivityDetails(+id);
    }
  });
  }

  private initializeForms() {
    // Personal Details Form
    this.personalForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      countryCode: ['+91', [Validators.required]],
      phoneNumber: ['', [Validators.required, CustomValidators.phoneNumberValidator()]],
      emailId: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      dob: ['', [CustomValidators.ageValidator()]],
      profileImageFile: [null]
    });

    // Institute Details Form
    this.instituteForm = this.fb.group({
      programTitle: ['', [Validators.required]],
      instituteName: ['', [Validators.required]],
      since: [''],
      gstNo: ['', [Validators.pattern('^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$')]],
      thumbnailImageFile: [null, [Validators.required]],
      introduction: ['', [Validators.required, Validators.minLength(50)]],
      websiteName: ['', [Validators.pattern('^https?://.*')]],
      classLevel: [''],
      instagramAccount: [''],
      youtubeAccount: ['']
    });

    // Class Details Form
    this.classForm = this.fb.group({
      type: ['Offline', [Validators.required]],
      className: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      timingsFrom: ['12:00', [Validators.required]],
      timingsTo: ['13:00', [Validators.required, CustomValidators.timeRangeValidator()]],
      weekdays: [[], [Validators.required]],
      fromage: [''],
      toage: [''],
      fromcost: [''],
      tocost: [''],
      gender: ['both'],
      experienceLevel: ['beginner'],
      noOfSessions: ['1'],
      location: [null, [Validators.required]],
      contact: [null, [Validators.required]]
    }, {
      validators: [
        minLessThanMaxValidator('fromage', 'toage', 'ageRange'),
        minLessThanMaxValidator('fromcost', 'tocost', 'costRange')
      ]
    });

    // Course Details Form
    this.courseForm = this.fb.group({
      type: ['Offline', [Validators.required]],
      courseName: ['', [Validators.required]],
      category: ['', [Validators.required]],
      subCategory: ['', [Validators.required]],
      timingsFrom: ['12:00', [Validators.required]],
      timingsTo: ['13:00', [Validators.required, CustomValidators.timeRangeValidator()]],
      weekdays: [[], [Validators.required]],
      fromage: [''],
      toage: [''],
      fromcost: [''],
      tocost: [''],
      gender: ['both'],
      experienceLevel: ['beginner'],
      noOfSessions: ['1'],
      location: [null, [Validators.required]],
      contact: [null, [Validators.required]]
    }, {
      validators: [
        minLessThanMaxValidator('fromage', 'toage', 'ageRange'),
        minLessThanMaxValidator('fromcost', 'tocost', 'costRange')
      ]
    });
  }

  private loadCategories() {
    this.isLoading = false;
    this.activityService.getCategories().subscribe({
      next: (data:any) => {
        this.categories = data;
      },
      error: (error:any) => {
        this.toastr.error('Error loading categories');
        console.error('Error:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

   loadSubCategories(){
this.isLoading = false;
    this.activityService.getSubCategories().subscribe({
      next: (data:any) => {
        this.subcategories = data;
      },
      error: (error:any) => {
        this.toastr.error('Error loading categories');
        console.error('Error:', error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
   }

       fetchActivityDetails(activityId: number) {
        this.isLoading = true;
        this.activityService.getActivityById(activityId).subscribe({
            next: (data) => {
                // Process image URLs
                if (data.thumbnailImage) {
                    data.thumbnailImage = this.processImageUrl(data.thumbnailImage);
                }
                if (data.images) {
                    data.images = data.images.map((img: string) => this.processImageUrl(img));
                }
                if (data.profileImage) {
                    data.profileImage = this.processImageUrl(data.profileImage);
                }

                // Patch Institute Details
                this.instituteForm.patchValue({
                    programTitle: data.title || '',
                    instituteName: data.companyName || '',
                    since: data.sinceYear || '',
                    gstNo: data.gstNo || '',
                    introduction: data.description || '',
                    websiteName: data.website || '',
                    classLevel: data.classLevel || '',
                    instagramAccount: data.instagramAcc || '',
                    youtubeAccount: data.youtubeAcc || '',
                    // thumbnailImageFile: data.thumbnailImage, // handle image separately if needed
                });
                this.instituteDetailsData = this.instituteForm.value;
                this.completedSections.instituteDetails = true;

                // Patch Personal Details
                this.personalForm.patchValue({
                    firstName: data.tutorFirstName || '',
                    lastName: data.tutorLastName || '',
                    phoneNumber: data.tutorPhoneNo || '',
                    emailId: data.tutorEmailID || '',
                    gender: '', // If available in data
                    dob: '',    // If available in data
                    // profileImageFile: data.profileImage, // handle image separately if needed
                });
                this.personalDetailsData = this.personalForm.value;
                this.completedSections.personalDetails = true;

                // Patch Class Details Table
                this.classDetailsData = Array.isArray(data.classDetails)
  ? data.classDetails.map((item: any) => ({
      ...item,
      className: item.className || item.title || '',
      weekdays: item.day ? item.day.split(',') : [], // Map title to className if className is missing
    }))
  : [];
if (this.classDetailsData.length > 0) {
  this.activeAccordion = 'item-2';
  this.completedSections.classDetails = true;
}
// Patch Course Details Table
this.courseDetailsData = Array.isArray(data.courseDetails)
  ? data.courseDetails.map((item: any) => ({
      ...item,
      courseName: item.courseName || item.title || '', // Map title to courseName if courseName is missing
      weekdays: item.day ? item.day.split(',') : [], // Convert day string to array
    }))
  : [];
if (this.courseDetailsData.length > 0) {
  this.activeAccordion = 'item-3';
  this.completedSections.classDetails = true;
}

                // Patch Images
                this.imageUrls = Array.isArray(data.images) ? data.images : [];
                this.profileImagePreview = data.profileImage || null;

                // Set thumbnail if available
                if (data.thumbnailImage) {
                    this.imageUrls.unshift(data.thumbnailImage);
                    this.selectedThumbnailIndex = 0;
                }

                // Open all relevant accordions if data exists
                if (this.personalDetailsData) this.activeAccordion = 'item-0';
                if (this.instituteDetailsData) this.activeAccordion = 'item-1';
                if (this.classDetailsData.length > 0) this.activeAccordion = 'item-2';
                if (this.courseDetailsData.length > 0) this.activeAccordion = 'item-3';

                // Set flags
                this.activeAccordion = 'item-0';
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error fetching activity details:', error);
                this.isLoading = false;
                this.toastr.error('Error loading activity details', 'Error');
            }
        });
    }

  private loadSavedData() {
    const savedPersonalDetails = localStorage.getItem('personalDetails');
    if (savedPersonalDetails) {
      const data = JSON.parse(savedPersonalDetails);
      this.personalForm.patchValue(data);
      this.completedSections.personalDetails = true;
    }

    const savedInstituteDetails = localStorage.getItem('instituteDetails');
    if (savedInstituteDetails) {
      const data = JSON.parse(savedInstituteDetails);
      this.instituteForm.patchValue(data);
      this.completedSections.instituteDetails = true;
    }
  }

  onAccordionClick(value: string) {
    if (value === this.activeAccordion) {
      this.activeAccordion = '';
      return;
    }

    const canOpen = (
      value === 'item-0' || 
      (value === 'item-1' && this.completedSections.personalDetails) ||
      (value === 'item-2' && this.completedSections.instituteDetails) ||
      (value === 'item-4' && this.completedSections.instituteDetails) ||
      (value === 'item-5' && this.completedSections.instituteDetails)
    );

    if (canOpen) {
      this.activeAccordion = value;
    } else {
      this.toastr.warning('Please complete previous sections first');
    }
  }

  handleProfileImageUpload(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        this.toastr.error('Image size should be less than 5MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        this.toastr.error('Please upload an image file');
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const imageBase64 = reader.result as string;
        const modalRef = this.modalService.open(CropImagePopupComponent, { size: 'lg' });
        modalRef.componentInstance.imageUrl = imageBase64;
        modalRef.componentInstance.cropComplete.subscribe((croppedFile: File) => {
          this.personalForm.patchValue({ profileImageFile: croppedFile });
          this.profileImagePreview = URL.createObjectURL(croppedFile);
          modalRef.close();
        });
        modalRef.componentInstance.close.subscribe(() => {
          modalRef.dismiss();
        });
      };
      reader.readAsDataURL(file);
    }
  }

  handleCropComplete(croppedImage: File) {
    this.personalForm.patchValue({ profileImageFile: croppedImage });
    this.profileImagePreview = URL.createObjectURL(croppedImage);
    this.tempImageUrl = null;
    this.isCropperOpen = false;
  }

  handleImageUpload(event: any) {
    const files: File[] = Array.from(event.target.files || []) as File[];

    if (this.images.length + files.length > 8) {
      this.toastr.error('Maximum 8 images allowed');
      return;
    }

    files.forEach((file: File) => {
      if (file.size > 8 * 1024 * 1024) {
        this.toastr.error(`${file.name} is too large. Maximum size is 8MB`);
        return;
      }

      if (!file.type.startsWith('image/')) {
        this.toastr.error(`${file.name} is not an image file`);
        return;
      }

      this.images.push(file);
      const url = URL.createObjectURL(file);
      this.imageUrls.push(url);

      if (this.images.length === 1) {
        this.selectedThumbnailIndex = 0;
        this.instituteForm.patchValue({ thumbnailImageFile: file });
      }
    });
  }

  handleThumbnailSelect(index: number) {
    this.selectedThumbnailIndex = index;
    this.instituteForm.patchValue({ thumbnailImageFile: this.images[index] });
  }

  handleImageDelete(index: number) {
    URL.revokeObjectURL(this.imageUrls[index]);
    this.images.splice(index, 1);
    this.imageUrls.splice(index, 1);

    if (this.selectedThumbnailIndex === index) {
      if (this.images.length > 0) {
        this.selectedThumbnailIndex = 0;
        this.instituteForm.patchValue({ thumbnailImageFile: this.images[0] });
      } else {
        this.selectedThumbnailIndex = null;
        this.instituteForm.patchValue({ thumbnailImageFile: null });
      }
    } else if (this.selectedThumbnailIndex && this.selectedThumbnailIndex > index) {
      this.selectedThumbnailIndex--;
    }
  }

  handleWeekdayChange(day: string, isClassForm: boolean = true) {
    const form = isClassForm ? this.classForm : this.courseForm;
    const currentWeekdays = form.get('weekdays')?.value || [];
    
    if (currentWeekdays.includes(day)) {
      const updated = currentWeekdays.filter((d: string) => d !== day);
      form.patchValue({ weekdays: updated });
    } else {
      form.patchValue({ weekdays: [...currentWeekdays, day] });
    }
  }

  savePersonalDetails() {
    if (this.personalForm.invalid) {
      Object.keys(this.personalForm.controls).forEach(key => {
        const control = this.personalForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.toastr.error('Please fill all required fields');
      return;
    }

    try {
      this.isLoading = true;
      const formData = this.personalForm.value;
      this.personalDetailsData = formData;
      localStorage.setItem('personalDetails', JSON.stringify(formData));
      
      this.completedSections.personalDetails = true;
      this.activeAccordion = 'item-1';
      this.toastr.success('Personal details saved successfully');
    } catch (error) {
      this.toastr.error('Error saving personal details');
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  saveInstituteDetails() {
    if (this.instituteForm.invalid) {
      Object.keys(this.instituteForm.controls).forEach(key => {
        const control = this.instituteForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.toastr.error('Please fill all required fields');
      return;
    }

    try {
      this.isLoading = true;
      const formData = this.instituteForm.value;
      this.instituteDetailsData = formData;
      localStorage.setItem('instituteDetails', JSON.stringify(formData));
      
      this.completedSections.instituteDetails = true;
      this.activeAccordion = 'item-2';
      this.toastr.success('Institute details saved successfully');
    } catch (error) {
      this.toastr.error('Error saving institute details');
      console.error('Error:', error);
    } finally {
      this.isLoading = false;
    }
  }

  saveClassDetails() {
    if (this.classForm.invalid) {
      Object.keys(this.classForm.controls).forEach(key => {
        const control = this.classForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.toastr.error('Please fill all required fields');
      return;
    }

    try {
      const classData = this.classForm.value;
      const classDetails: ClassCourseDetails = {
        ...classData,
        id: Date.now(),
        title: classData.className,
        subCategoryID: classData.subCategory,
        categoryID: classData.category,
        timingsFrom: classData.timingsFrom,
        timingsTo: classData.timingsTo,
        day: classData.weekdays.join(','),
        type: classData.type,
        ageFrom: parseInt(classData.fromage) || 0,
        ageTo: parseInt(classData.toage) || 0,
        sessionFrom: parseInt(classData.sessionFrom) || 0,
        sessionTo: parseInt(classData.sessionTo) || 1,
        gender: classData.gender,
        fromPrice: parseFloat(classData.fromcost) || 0,
        toPrice: parseFloat(classData.tocost) || 0,
        location: classData.location,
        contact: classData.contact
      };

      if (this.editingIndex !== null) {
        this.classDetailsData[this.editingIndex] = classDetails;
      } else {
        this.classDetailsData.push(classDetails);
      }

      this.classForm.reset({
        type: 'Offline',
        gender: 'both',
        experienceLevel: 'beginner',
        noOfSessions: '1'
      });
      this.editingIndex = null;
      this.showClassFields = false;
      this.toastr.success('Class details saved successfully');
    } catch (error) {
      this.toastr.error('Error saving class details');
      console.error('Error:', error);
    }
  }

  saveCourseDetails() {
    if (this.courseForm.invalid) {
      Object.keys(this.courseForm.controls).forEach(key => {
        const control = this.courseForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
      this.toastr.error('Please fill all required fields');
      return;
    }

    try {
      const courseData = this.courseForm.value;
      const courseDetails: ClassCourseDetails = {
        ...courseData,
        id: Date.now(),
        title: courseData.courseName,
        subCategoryID: courseData.subCategory,
        categoryID: courseData.category,
        timingsFrom: courseData.timingsFrom,
        timingsTo: courseData.timingsTo,
        day: courseData.weekdays.join(','),
        type: courseData.type,
        ageFrom: parseInt(courseData.fromage) || 0,
        ageTo: parseInt(courseData.toage) || 0,
        sessionFrom: parseInt(courseData.sessionFrom) || 0,
        sessionTo: parseInt(courseData.sessionTo) || 1,
        gender: courseData.gender,
        fromPrice: parseFloat(courseData.fromcost) || 0,
        toPrice: parseFloat(courseData.tocost) || 0,
        location: courseData.location,
        contact: courseData.contact
      };

      if (this.editingIndex !== null) {
        this.courseDetailsData[this.editingIndex] = courseDetails;
      } else {
        this.courseDetailsData.push(courseDetails);
      }

      this.courseForm.reset({
        type: 'Offline',
        gender: 'both',
        experienceLevel: 'beginner',
        noOfSessions: '1'
      });
      this.editingIndex = null;
      this.showCourseFields = false;
      this.toastr.success('Course details saved successfully');
    } catch (error) {
      this.toastr.error('Error saving course details');
      console.error('Error:', error);
    }
  }

  handleSubmit() {
    if (!this.completedSections.personalDetails || !this.personalDetailsData) {
      this.toastr.error('Please complete Personal Details section');
      this.activeAccordion = 'item-0';
      return;
    }

    if (!this.completedSections.instituteDetails || !this.instituteDetailsData) {
      this.toastr.error('Please complete Institute Details section');
      this.activeAccordion = 'item-1';
      return;
    }

    if (this.classDetailsData.length === 0 && this.courseDetailsData.length === 0) {
      this.toastr.error('Please add at least one class or course');
      return;
    }

    this.isPreviewOpen = true;
  }

  handleSubmitAfterPreview() {
    this.isLoading = true;
    const formData = new FormData();

    // Add personal details
    formData.append('name', `${this.personalDetailsData.firstName} ${this.personalDetailsData.lastName}`);
    formData.append('emailId', this.personalDetailsData.emailId);
    // Combine country code and phone number
    const phoneNumber = `${this.personalDetailsData.countryCode}${this.personalDetailsData.phoneNumber}`;
    formData.append('phoneNumber', phoneNumber);
    formData.append('gender', this.personalDetailsData.gender);
    if (this.personalDetailsData.dob) {
      formData.append('dob', new Date(this.personalDetailsData.dob).toISOString());
    }
    if (this.personalDetailsData.profileImageFile instanceof File) {
      formData.append('profileImageFile', this.personalDetailsData.profileImageFile);
    }

    // Add institute details
    formData.append('activity.type', 'INSTITUTE');
    formData.append('activity.title', this.instituteDetailsData.programTitle);
    formData.append('activity.companyName', this.instituteDetailsData.instituteName);
    formData.append('activity.description', this.instituteDetailsData.introduction || '');
    formData.append('activity.sinceYear', this.instituteDetailsData.since || '');
    formData.append('activity.gstNo', this.instituteDetailsData.gstNo || '');
    formData.append('activity.website', this.instituteDetailsData.websiteName || '');
    formData.append('activity.classLevel', this.instituteDetailsData.classLevel || '');
    formData.append('activity.instagramAcc', this.instituteDetailsData.instagramAccount || '');
    formData.append('activity.youtubeAcc', this.instituteDetailsData.youtubeAccount || '');

    // Add images
    if (this.selectedThumbnailIndex !== null && this.images[this.selectedThumbnailIndex]) {
      formData.append('activity.thumbnailImageFile', this.images[this.selectedThumbnailIndex]);
    }

    this.images.forEach((image, index) => {
      if (index !== this.selectedThumbnailIndex) {
        formData.append('activity.images', image);
      }
    });

    // Add class and course details
    const classDetails = this.classDetailsData.map(item => ({
      ...item,
      id: 0,
      activityId: 0
    }));

    const courseDetails = this.courseDetailsData.map(item => ({
      ...item,
      id: 0,
      activityId: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    }));

    formData.append('activity.classDetails', JSON.stringify(classDetails));
    formData.append('activity.courseDetails', JSON.stringify(courseDetails));
    formData.append('activity.id', '0');

    this.activityService.registerVendor(formData).subscribe({
      next: (response:any) => {
        this.username = response.username;
        this.isSuccessPopupOpen = true;
        this.isPreviewOpen = false;
        this.toastr.success('Registration completed successfully!');
      },
      error: (error:any) => {
        console.error('API Error:', error);
        this.toastr.error(error.message || 'An error occurred during registration');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  handleEditClass(index: number) {
    const classToEdit = this.classDetailsData[index];
    if (classToEdit) {
      this.classForm.patchValue(classToEdit);
      this.editingIndex = index;
      this.showClassFields = true;
      this.activeAccordion = 'item-2';
    }
  }

  handleEditCourse(index: number) {
    const courseToEdit = this.courseDetailsData[index];
    if (courseToEdit) {
      this.courseForm.patchValue(courseToEdit);
      this.editingIndex = index;
      this.showCourseFields = true;
      this.activeAccordion = 'item-3';
    }
  }

  handleDeleteClass(index: number) {
    this.deleteMessage = 'Are you sure you want to delete this class?';
    this.isDeleteOpen = true;
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent, {
                  centered: true,
                  backdrop: 'static'
                });
                
                modalRef.componentInstance.title = 'Delete Class';
                modalRef.componentInstance.message = this.deleteMessage ;
                
                modalRef.result.then(
                  (result) => {
                    if (result === 'delete') {
                      // Handle delete action here
                      this.classDetailsData.splice(index, 1);
      this.toastr.success('Class deleted successfully');
                    }
                  },
                  (reason) => {
                    // Modal dismissed
                    console.log('Modal dismissed');
                  }
                );
  }

  handleDeleteCourse(index: number) {
    this.deleteMessage = 'Are you sure you want to delete this course?';
    this.isDeleteOpen = true;
    const modalRef = this.modalService.open(DeleteConfirmationModalComponent, {
                  centered: true,
                  backdrop: 'static'
                });
                
                modalRef.componentInstance.title = 'Delete Course';
                modalRef.componentInstance.message = this.deleteMessage ;
                
                modalRef.result.then(
                  (result) => {
                    if (result === 'delete') {
                      // Handle delete action here
                      this.courseDetailsData.splice(index, 1);
      this.toastr.success('Course deleted successfully');
                    }
                  },
                  (reason) => {
                    // Modal dismissed
                    console.log('Modal dismissed');
                  }
                );
  }

  handleCopyClass(index: number) {
    const classToCopy = this.classDetailsData[index];
    if (classToCopy) {
      const copiedClass = {
        ...classToCopy,
        id: Date.now(),
        className: `${classToCopy.className} (Copy)`
      };
      this.classDetailsData.push(copiedClass);
      this.toastr.success('Class copied successfully');
    }
  }

  handleCopyCourse(index: number) {
    const courseToCopy = this.courseDetailsData[index];
    if (courseToCopy) {
      const copiedCourse = {
        ...courseToCopy,
        id: Date.now(),
        className: `${courseToCopy.className} (Copy)`
      };
      this.courseDetailsData.push(copiedCourse);
      this.toastr.success('Course copied successfully');
    }
  }

  handleClearForm() {
    this.personalForm.reset();
    this.instituteForm.reset();
    this.classForm.reset();
    this.courseForm.reset();
    this.images = [];
    this.imageUrls = [];
    this.selectedThumbnailIndex = null;
    this.profileImagePreview = null;
    this.showClassFields = false;
    this.showCourseFields = false;
    this.personalDetailsData = null;
    this.instituteDetailsData = null;
    this.classDetailsData = [];
    this.courseDetailsData = [];
    this.completedSections = {
      personalDetails: false,
      instituteDetails: false,
      classDetails: false
    };
    this.activeAccordion = 'item-0';
    localStorage.removeItem('personalDetails');
    localStorage.removeItem('instituteDetails');
  }

  handleLocationSubmit(locationData: LocationData) {
    try {
      this.savedLocations = [...this.savedLocations, locationData];
      const form = this.showClassFields ? this.classForm : this.courseForm;
      form.patchValue({ location: locationData });
      this.isLocationPopupOpen = false;
      this.toastr.success('LocationData saved successfully');
    } catch (error) {
      this.toastr.error('Error saving location');
      console.error('Error:', error);
    }
  }

  handleContactSubmit(contactData: Contact) {
    try {
      this.savedContacts = [...this.savedContacts, contactData];
      const form = this.showClassFields ? this.classForm : this.courseForm;
      form.patchValue({ contact: contactData });
      this.isContactPopupOpen = false;
      this.toastr.success('Contact saved successfully');
    } catch (error) {
      this.toastr.error('Error saving contact');
      console.error('Error:', error);
    }
  }

  handleFinalSubmit() {
    if (!this.completedSections.personalDetails || !this.personalDetailsData) {
      this.toastr.error('Please complete the Profile Details section first');
      this.activeAccordion = 'item-0';
      return;
    }

    if (!this.completedSections.instituteDetails || !this.instituteDetailsData) {
      this.toastr.error('Please complete the Institute Details section first');
      this.activeAccordion = 'item-1';
      return;
    }

    if (this.classDetailsData.length === 0 && this.courseDetailsData.length === 0) {
      this.toastr.error('Please add at least one class or course');
      return;
    }

    // Open preview modal
    const modalRef = this.modalService.open(PreviewPopupComponent, { size: 'lg' });
    modalRef.componentInstance.personalDetails = this.personalDetailsData;
    modalRef.componentInstance.instituteDetails = this.instituteDetailsData;
    modalRef.componentInstance.classDetails = this.classDetailsData;
    modalRef.componentInstance.courseDetails = this.courseDetailsData;
    modalRef.componentInstance.images = this.imageUrls;
    modalRef.componentInstance.profileImage = this.profileImagePreview;
    modalRef.result.then((result: any) => {
      if (result === 'confirm') {
        this.isPreviewOpen = false;
        this.submitAllData();
      }
    }, () => {
      this.isPreviewOpen = false;
    });
  }

  // Add a stub for submitAllData (should contain the actual submission logic)
  submitAllData() {
    // TODO: Implement actual submission logic here
    this.toastr.success('Registration submitted successfully!');
  }

  handleContactSelect(contact: Contact) {
    const form = this.showClassFields ? this.classForm : this.courseForm;
    form.patchValue({ contact });
  }

  handleDeleteLocation(index: number) {
    this.savedLocations = this.savedLocations.filter((_, i) => i !== index);
    
    // Reset form location if deleted location was selected
    const currentLocation = this.showClassFields ? 
      this.classForm.get('location')?.value : 
      this.courseForm.get('location')?.value;
      
    if (currentLocation && currentLocation.id === this.savedLocations[index].id) {
      const form = this.showClassFields ? this.classForm : this.courseForm;
      form.patchValue({ location: null });
    }
  }

  handleDeleteContact(index: number) {
    this.savedContacts = this.savedContacts.filter((_, i) => i !== index);
    
    // Reset form contact if deleted contact was selected
    const currentContact = this.showClassFields ? 
      this.classForm.get('contact')?.value : 
      this.courseForm.get('contact')?.value;
      
    if (currentContact && currentContact.id === this.savedContacts[index].id) {
      const form = this.showClassFields ? this.classForm : this.courseForm;
      form.patchValue({ contact: null });
    }
  }

  openLocationPopup() {
    const modalRef = this.modalService.open(AddLocationPopupComponent, { size: 'lg' });
    modalRef.componentInstance.savedLocations = this.savedLocations;
    modalRef.result.then((locationData: LocationData) => {
      if (locationData) {
        this.handleLocationSubmit(locationData);
      }
    }, () => {});
  }

  openContactPopup() {
      const modalRef = this.modalService.open(AddContactPopupComponent, { size: 'lg' });
  modalRef.componentInstance.profileDetails = this.personalForm.value;
  modalRef.componentInstance.submit.subscribe((contactData: any) => {
    this.handleContactSubmit(contactData);
  });
  }

  closeLocationPopup() {
    this.isLocationPopupOpen = false;
  }

  closeContactPopup() {
    this.isContactPopupOpen = false;
  }

  onPopupClose(type: 'class' | 'course') {
    if (type === 'class') {
      this.showClassFields = false;
    } else {
      this.showCourseFields = false;
    }
    this.editingIndex = null;
  }

  onTypeChange() {
    const form = this.showClassFields ? this.classForm : this.courseForm;
    const type = form.get('type')?.value;
    
    if (type === 'Online') {
      form.get('location')?.clearValidators();
      form.get('location')?.updateValueAndValidity();
    } else {
      form.get('location')?.setValidators([Validators.required]);
      form.get('location')?.updateValueAndValidity();
    }
  }

  onCourseTypeChange() {
    const type = this.courseForm.get('type')?.value;
    if (type === 'Online') {
      this.courseForm.get('location')?.clearValidators();
      this.courseForm.get('location')?.updateValueAndValidity();
    } else {
      this.courseForm.get('location')?.setValidators([Validators.required]);
      this.courseForm.get('location')?.updateValueAndValidity();
    }
  }

  getLocationFormatted(location: LocationData): string {
    if (!location) return '';
    return `${location.address}, ${location.area}, ${location.city}, ${location.state}, ${location.country} - ${location.pincode}`;
  }

  getContactFormatted(contact: Contact): string {
    if (!contact) return '';
    return `${contact.tutorFirstName} ${contact.tutorLastName}`;
  }

  onClassCategoryChange() {
  const selectedId = this.classForm.get('category')?.value;
  this.classSubcategories = this.subcategories.filter(sub => sub.categoryId == selectedId);
  this.classForm.get('subCategory')?.setValue('');
}

onCourseCategoryChange() {
  const selectedId = this.courseForm.get('category')?.value;
  this.courseSubcategories = this.subcategories.filter(sub => sub.categoryId == selectedId);
  this.courseForm.get('subCategory')?.setValue('');
}

removeProfileImage() {
  this.profileImagePreview = null;
  this.personalForm.patchValue({ profileImageFile: null });
  if (this.profileImageInput) {
    this.profileImageInput.nativeElement.value = '';
  }
}

openAddDetailsModal() {
  this.modalService.open(this.addDetailsmodal, { size: 'md', centered: true });
}

selectAddDetails(type: 'class' | 'course', modal: any) {
  modal.close();
  this.showClassFields = type === 'class';
  this.showCourseFields = type === 'course';
  if(type=== 'class') {
    this.activeAccordion = 'item-2';
  } else {
    this.activeAccordion = 'item-3';
  }
}

    private processImageUrl(url: string): string {
        if (!url) return '';
        
        // If the URL is already absolute, return it as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // If the URL is relative, prepend the API base URL
        return `${environment.imageUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }
}




export class CustomValidators {
  static ageValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) return null;

      const today = new Date();
      const birthDate = new Date(control.value);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();

      if (age > 16) return null;
      if (age === 16) {
        if (monthDiff > 0) return null;
        if (monthDiff === 0 && dayDiff >= 0) return null;
      }

      return { 'minAge': true };
    };
  }

  static timeRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control.parent;
      if (!group) return null;

      const from = group.get('timingsFrom')?.value;
      const to = group.get('timingsTo')?.value;

      if (!from || !to) return null;

      const [fromH, fromM] = from.split(':').map(Number);
      const [toH, toM] = to.split(':').map(Number);
      const fromMinutes = fromH * 60 + fromM;
      const toMinutes = toH * 60 + toM;
      const adjustedToMinutes = toMinutes <= fromMinutes ? toMinutes + 24 * 60 : toMinutes;
      const duration = adjustedToMinutes - fromMinutes;

      if (duration <= 0 || duration > 12 * 60) {
        return { 'invalidTimeRange': true };
      }

      return null;
    };
  }

  static phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valid = /^\+?[1-9]\d{1,14}$/.test(control.value);
      return valid ? null : { 'invalidPhone': true };
    };
  }
}

// Custom validator for range fields (outside the class)
export function minLessThanMaxValidator(minField: string, maxField: string, errorKey: string): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const min = group.get(minField)?.value;
    const max = group.get(maxField)?.value;
    if (min !== null && max !== null && min !== '' && max !== '' && Number(max) > 0 && Number(max) < Number(min)) {
      const error = { [errorKey]: true };
      group.get(maxField)?.setErrors(error);
      return error;
    } else {
      if (group.get(maxField)?.hasError(errorKey)) {
        group.get(maxField)?.setErrors(null);
      }
      return null;
    }
  };
}


