import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { CategoryService } from 'src/app/services/category.service';
import { processImageUrl } from 'src/app/utils/processImgUrl';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  categoryForm!: FormGroup;
  submitted = false;
  catImage: File | undefined;
  catId:any;
  isLoading: boolean = false;
  catImagePathReceived:any;

  constructor(private formBuilder: FormBuilder,private router: Router,private route: ActivatedRoute,private categoryService: CategoryService,private toastr: ToastrMessageService,) {
            this.route.params.subscribe((params:any) => {
            this.catId = +params['id'];
            this.fetchCatDetails();
        });
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      sort: ['', [Validators.required]],
      imagePath: ['', [Validators.required]]
    });
  }

  fetchCatDetails(){
            if (!this.catId) return;
        
        this.isLoading = true;
        this.categoryService.getCategoryDetails(this.catId).subscribe({
            next: (data:any) => {
                this.categoryForm.patchValue({
                  title: data.title,
                  sort: data.sort,
                  imagePath:data.imagePath
                })
                this.categoryForm.get('imagePath')?.clearValidators();
                this.categoryForm.get('imagePath')?.updateValueAndValidity();
                this.catImagePathReceived = processImageUrl(data.imagePath);
            },
            error: (error:any) => {
                this.isLoading = false;
                this.toastr.showError('Error loading Categories', 'Error');
            }
        });
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

        const formData = new FormData();
    
    // Append form fields
    formData.append('title', this.categoryForm.get('title')?.value);
    formData.append('sort', this.categoryForm.get('sort')?.value);
    
    // Append file with the parameter name you want
        if (this.catImage) {
      formData.append('imagePathFile', this.catImage);
    }

    // Call service with FormData
    if(!this.catId){
    this.categoryService.createCategory(formData).subscribe({
      next: () => {
        this.toastr.showSuccess('Category Added Successfully', 'Success');
        this.router.navigate(['masters/categories'])
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.toastr.showError('Error creating category', 'Error');
      }
    });
    }
    
    else{
      formData.append('id', this.catId);
    this.categoryService.updateCategory(formData).subscribe({
      next: () => {
        this.toastr.showSuccess('Category Updated Successfully', 'Success');
        this.router.navigate(['masters/categories'])
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.toastr.showError('Error updating category', 'Error');
      }
    });
    }
  }

   onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.catImage = file;
      // Update form control value to show file is selected
      this.categoryForm.patchValue({
        imagePath: file.name
      });
      // this.catImagePathReceived = file.path; // Process the image URL if needed
      // Mark the control as touched to trigger validation
      this.categoryForm.get('imagePath')?.markAsTouched();
    }
  }

  onCancel() {
    this.categoryForm.reset();
    this.submitted = false;
  }

    resetForm(): void {
    this.categoryForm.reset();
    this.catImage = undefined;
    this.submitted = false;
  }

}