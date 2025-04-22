import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProgramsRegisteredComponent } from './programs-registered/programs-registered.component';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AddProgramComponent } from './programs-registered/add-program/add-program.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const routes: Routes = [

  {
    path: "",
    component: ProgramsRegisteredComponent
  },
  {
    path: "add-program",
    component: AddProgramComponent
  },

];

@NgModule({
  declarations: [
    ProgramsRegisteredComponent,
    AddProgramComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    NgbPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class ProgramsModule { }
