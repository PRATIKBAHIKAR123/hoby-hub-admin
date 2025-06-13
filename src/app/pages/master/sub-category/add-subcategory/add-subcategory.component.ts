import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-subcategory',
  templateUrl: './add-subcategory.component.html',
  styleUrls: ['./add-subcategory.component.scss']
})
export class AddSubcategoryComponent {
  categoryForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required]],
      sort: ['', [Validators.required]],
      imagePath: ['', [Validators.required]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.categoryForm.invalid) {
      return;
    }

    // Handle form submission here
    console.log(this.categoryForm.value);
  }

  onCancel() {
    this.categoryForm.reset();
    this.submitted = false;
  }
}
