import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories/categories.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AgGridModule } from 'ag-grid-angular';
import { NgbCarouselModule, NgbModalModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './categories/add-category/add-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubCategoryComponent } from './sub-category/sub-category.component';
import { AddSubcategoryComponent } from './sub-category/add-subcategory/add-subcategory.component';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const routes: Routes = [
  {
    path: "categories",
    component: CategoriesComponent
  },
  {
    path: "add-category",
    component: AddCategoryComponent
  },
  {
    path: "category-edit/:id",
    component: AddCategoryComponent
  },
  {
    path: "sub-categories",
    component: SubCategoryComponent
  },
  {
    path: "add-subcategory",
    component: AddSubcategoryComponent
  },
  {
    path: "subcategory-edit/:id",
    component: AddSubcategoryComponent
  },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    AddCategoryComponent,
    SubCategoryComponent,
    AddSubcategoryComponent
  ],
  imports: [
    ReactiveFormsModule,
    SharedModule,
    CommonModule,
    NgbPaginationModule,
    NgbModalModule,
    NgbCarouselModule,
    AgGridModule,
    RouterModule.forChild(routes),
  ]
})
export class MasterModule { }
