import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbToastModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CountUpModule } from 'ngx-countup';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

import { LightboxModule } from 'ngx-lightbox';

// Load Icons
import { defineElement } from 'lord-icon-element';
import lottie from 'lottie-web';

// Pages Routing
import { PagesRoutingModule } from "./pages-routing.module";
import { SharedModule } from "../shared/shared.module";
import { WidgetModule } from '../shared/widget/widget.module';
import { DashboardComponent } from './dashboards/dashboard/dashboard.component';
import { ToastsContainer } from './dashboards/dashboard/toasts-container.component';
import { DashboardsModule } from "./dashboards/dashboards.module";
import { ProgramsModule } from './programs/programs.module';
import { AccountHolderComponent } from './account-holder/account-holder.component';
import { StudentRegisteredComponent } from './student-registered/student-registered/student-registered.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ToastsContainer,
    AccountHolderComponent,
    StudentRegisteredComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbToastModule,
    FlatpickrModule.forRoot(),
    CountUpModule,
    NgApexchartsModule,
    LeafletModule,
    NgbPaginationModule,
    NgbDropdownModule,
    SimplebarAngularModule,
    PagesRoutingModule,
    SharedModule,
    WidgetModule,
    SlickCarouselModule,
    LightboxModule,
    DashboardsModule,
    ProgramsModule
  ],
})
export class PagesModule {
  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
