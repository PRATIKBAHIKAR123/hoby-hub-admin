import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent {
  categoryForm!: FormGroup;
  submitted = false;
  isLoading = false;
    catId:any;
  categories:any=[];

  constructor(private router: Router,private formBuilder: FormBuilder,private categoryService: CategoryService,private route: ActivatedRoute,private toastr: ToastrMessageService) {
                this.route.params.subscribe((params:any) => {
            this.catId = +params['id'];
            this.fetchCatDetails();
        });
  }

  ngOnInit(): void {
    this.loadCategories();
    this.categoryForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      categoryId:['',[Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

    loadCategories() {
    this.isLoading = true;
    // Replace this with your actual API call
    this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data;
    })
    this.isLoading = false;
  }

  fetchCatDetails(){
            if (!this.catId) return;
        
        this.isLoading = true;
        this.categoryService.getSubCategoryDetails(this.catId).subscribe({
            next: (data:any) => {
                this.categoryForm.patchValue({
                  title: data.title,
                  categoryId: data.categoryId,
                })
            },
            error: (error:any) => {
                this.isLoading = false;
                this.toastr.showError('Error loading Categories', 'Error');
            }
        });
  }

  onSubmit() {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

        const formData = new FormData();
    
    // Append form fields
    formData.append('title', this.categoryForm.get('title')?.value);
    formData.append('categoryId', this.categoryForm.get('categoryId')?.value);

    // Call service with FormData
    if(!this.catId){
    this.categoryService.createSubCategory(formData).subscribe({
      next: () => {
        this.toastr.showSuccess('SubCategory Added Successfully', 'Success');
        this.router.navigate(['masters/sub-categories'])
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.toastr.showError('Error creating category', 'Error');
      }
    });
    }
    
    else{
      formData.append('id', this.catId);
    this.categoryService.updateSubCategory(formData).subscribe({
      next: () => {
        this.toastr.showSuccess('SubCategory Updated Successfully', 'Success');
        this.router.navigate(['masters/sub-categories'])
      },
      error: (error) => {
        console.error('Error creating category:', error);
        this.toastr.showError('Error updating category', 'Error');
      }
    });
    }
  }


  onCancel() {
    this.categoryForm.reset();
    this.submitted = false;
  }

    resetForm(): void {
    this.categoryForm.reset();
    this.submitted = false;
  }
}
