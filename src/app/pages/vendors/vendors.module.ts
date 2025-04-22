import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors/vendors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorComponent } from './vendors/add-vendor/add-vendor.component';


const routes: Routes = [

  {
    path: "",
    component: VendorsComponent
  },
   {
    path: "add-vendor",
    component: AddVendorComponent
  },

];

@NgModule({
  declarations: [
    VendorsComponent,
    AddVendorComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgbPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class VendorsModule { }
