import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { CategoryService } from 'src/app/services/category.service';
import { ActionButtonsColumnComponent } from 'src/app/shared/action-buttons-column/action-buttons-column.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {


   public columnDefs: ColDef[] = [
    { valueGetter: "node.rowIndex + 1", headerName: 'Sr No.', sortable: true,width:10, filter: true },
    { field: 'title', headerName: 'Category Name', sortable: true, filter: true },
    { field: 'sort', headerName: 'Sort',width:20, sortable: true, filter: true },
    // { 
    //   field: 'status', 
    //   headerName: 'Status',
    //   cellRenderer: (params: any) => {
    //     return `<span class="badge bg-success">Active</span>`;
    //   }
    // },
    // { 
    //   field: 'createdDate', 
    //   headerName: 'Created Date',
    //   sortable: true,
    //   filter: true,
    //   valueFormatter: (params) => {
    //     return new Date(params.value).toLocaleDateString();
    //   }
    // },
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
  public isLoading = false;

  constructor(private router: Router,private modalService: NgbModal, private categoryService: CategoryService,private toastr: ToastrMessageService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    // Replace this with your actual API call
    this.categoryService.getCategories().subscribe((data)=>{
      console.log(data)
      this.rowData = data;
    })
    this.isLoading = false;
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }



  onEdit(rowData: any) {
  this.router.navigate(['/masters/category-edit', rowData.id]);
}

onDelete(rowData: any) {
        const modalRef = this.modalService.open(DeleteConfirmationModalComponent, {
              centered: true,
              backdrop: 'static'
            });
            
            modalRef.componentInstance.title = 'Delete Category';
            modalRef.componentInstance.message = `Are you sure you want to delete Category "${rowData.title}"?`;
            
            modalRef.result.then(
              (result) => {
                if (result === 'delete') {
                  // Handle delete action here
                      this.categoryService.deleteCategory(rowData.id).subscribe({
                        next: (data:any) => {
                this.toastr.showSuccess('Category Deleted Successfully','Delete');
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
}

