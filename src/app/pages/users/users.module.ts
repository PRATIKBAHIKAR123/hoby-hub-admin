import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from './users-list/users-list.component';
import { AgGridModule } from 'ag-grid-angular';
import { RouterModule, Routes } from '@angular/router';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { AddUserComponent } from './add-user/add-user.component';
import { ReactiveFormsModule } from '@angular/forms';

ModuleRegistry.registerModules([AllCommunityModule]);


const routes: Routes = [
  {
    path: "",
    component: UsersListComponent
  },
  {
    path: "add-user",
    component: AddUserComponent
  },
];

@NgModule({
  declarations: [
  
    UsersListComponent,
       AddUserComponent
  ],
  imports: [
    AgGridModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
    CommonModule
  ]
})
export class UsersModule { }
