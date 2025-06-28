import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { forkJoin } from 'rxjs';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActionButtonsColumnComponent } from 'src/app/shared/action-buttons-column/action-buttons-column.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {
   public columnDefs: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'Sr No.', sortable: true,width:10, filter: true },
    { field: 'title', headerName: 'Subcategory Name', sortable: true, filter: true },
        { field: 'categoryId', headerName: 'Category Name', sortable: true, filter: true,   valueGetter: (params) => {
    const categoryId = params.data.categoryId;
    const category = this.categoryList.find(c => c.id === categoryId);
    return category?.title || 'Unknown';
  }, },
    
    {
      width:20,
      field: 'action',
      headerName: 'Action',
      cellRenderer: 'actionCellRenderer'
    }
  ];

  context = { componentParent: this };

  frameworkComponents = {
  actionCellRenderer: ActionButtonsColumnComponent
};

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  public rowData: any[] = [];
    public categoryList: any[] = [];
  public isLoading = false;

  constructor(private router: Router,private modalService: NgbModal, private categoryService: CategoryService,private toastr: ToastrMessageService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    // Replace this with your actual API call
    

    forkJoin([
    this.categoryService.getSubCategories(),
    this.categoryService.getCategories()  // your actual rowData
  ]).subscribe(([subcategories, categories]) => {
    this.rowData = subcategories;
    this.categoryList = categories;
  });
    this.isLoading = false;
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }



  onEdit(rowData: any) {
  this.router.navigate(['/masters/subcategory-edit', rowData.id]);
}

onDelete(rowData: any) {
        const modalRef = this.modalService.open(DeleteConfirmationModalComponent, {
              centered: true,
              backdrop: 'static'
            });
            
            modalRef.componentInstance.title = 'Delete SubCategory';
            modalRef.componentInstance.message = `Are you sure you want to delete SubCategory "${rowData.title}"?`;
            
            modalRef.result.then(
              (result) => {
                if (result === 'delete') {
                  // Handle delete action here
                      this.categoryService.deleteSubCategory(rowData.id).subscribe({
                        next: (data:any) => {
                this.toastr.showSuccess('SubCategory Deleted Successfully','Delete');
                this.loadCategories();
            },
            error: (error:any) => {
                this.isLoading = false;
                this.toastr.showError('Error Deleting Category', 'Error');
            }
      
    })
                }
              },
              (reason) => {
                // Modal dismissed
                console.log('Modal dismissed');
              }
            );
}

resolvecategoryName(id:any):string{
  const category = this.categoryList.find(c => c.id === id);
  return category?.title || 'Unknown';
}
}
