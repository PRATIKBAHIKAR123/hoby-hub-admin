import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities/activities.component';
import { SharedModule } from 'src/app/shared/shared.module';
import {  NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddNewAdComponent } from './add-new-ad/add-new-ad.component';
import { AddContactPopupComponent } from './add-contact-popup/add-contact-popup.component';
import { AddLocationPopupComponent } from './add-location-popup/add-location-popup.component';
import { ActivityDetailsComponent } from './activity-details/activity-details.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
ModuleRegistry.registerModules([AllCommunityModule]);

const routes: Routes = [
  {
    path: "",
    component: ActivitiesComponent
  },
    {
    path: "register-new-vendor",
    component: AddNewAdComponent
  },
      {
    path: "activity-details/:id",
    component: ActivityDetailsComponent
  },
        {
    path: "activity-edit/:id",
    component: AddNewAdComponent
  },
];


@NgModule({
  declarations: [
    ActivitiesComponent,
    AddNewAdComponent,
    AddContactPopupComponent,
    AddLocationPopupComponent,
    ActivityDetailsComponent
  ],
  imports: [
        SharedModule,
        CommonModule,
        FormsModule,
        NgbModalModule,
        AgGridModule,
        LeafletModule,
        ReactiveFormsModule,
    NgbModule,
        RouterModule.forChild(routes),
  ]
})
export class ActivitiesModule { }
