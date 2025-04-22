import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    
    {
      path: "",
      component: ProfileDetailsComponent
  },
   
];

@NgModule({
  declarations: [
    ProfileDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
