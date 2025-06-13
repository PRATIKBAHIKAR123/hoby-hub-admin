import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
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