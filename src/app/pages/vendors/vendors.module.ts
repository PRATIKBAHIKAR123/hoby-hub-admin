import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorsComponent } from './vendors/vendors.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgbPaginationModule, NgbModalModule, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorComponent } from './vendors/add-vendor/add-vendor.component';
import { VendorDetailsComponent } from './vendor-details/vendor-details.component';
import { AgGridModule } from 'ag-grid-angular';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const routes: Routes = [
  {
    path: "",
    component: VendorsComponent
  },
  {
    path: "add-vendor",
    component: AddVendorComponent
  },
  {
    path: "edit:id",
    component: VendorDetailsComponent
  }
];

@NgModule({
  declarations: [
    VendorsComponent,
    AddVendorComponent,
    VendorDetailsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgbPaginationModule,
    AgGridModule,
    NgbModalModule,
    NgbCarouselModule,
    RouterModule.forChild(routes)
  ]
})
export class VendorsModule { }
