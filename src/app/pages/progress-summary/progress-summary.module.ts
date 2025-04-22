import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgressSummaryComponent } from './progress-summary/progress-summary.component';
import { RouterModule, Routes } from '@angular/router';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [

  {
    path: "",
    component: ProgressSummaryComponent
  },

];


@NgModule({
  declarations: [
    ProgressSummaryComponent
  ],
  imports: [
    CommonModule,
    NgbPaginationModule,
    RouterModule.forChild(routes)

  ]
})
export class ProgressSummaryModule { }
