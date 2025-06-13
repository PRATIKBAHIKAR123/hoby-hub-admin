import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TermsAndConditionComponent } from './terms-and-condition/terms-and-condition.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PrivacyPoliciesComponent } from './privacy-policies/privacy-policies.component';


const routes: Routes = [
  {
    path: "terms-and-conditions",
    component: TermsAndConditionComponent
  },
    {
    path: "privacy-policies",
    component: PrivacyPoliciesComponent
  },
];

@NgModule({
  declarations: [
    TermsAndConditionComponent,
    PrivacyPoliciesComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    CKEditorModule
  ]
})
export class TermsAndPolicyModule { }
