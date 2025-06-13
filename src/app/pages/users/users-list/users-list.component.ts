import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
   public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'UID', sortable: true, filter: true },
    { field: 'categoryName', headerName: 'Name', sortable: true, filter: true },
    //{ field: 'subCategoryName', headerName: 'Subcategory Name', sortable: true, filter: true },
    { 
      field: 'status', 
      headerName: 'Status',
      cellRenderer: (params: any) => {
        return `<span class="badge bg-success">Active</span>`;
      }
    },
    { 
      field: 'createdDate', 
      headerName: 'Created Date',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: (params: any) => {
        return `
          <div class="d-flex gap-2 align-items-center">
            <img src="assets/images/icons/Edit Square.png" width="16" height="16" class="edit-icon"/>
            <img src="assets/images/icons/Delete 2.png" width="16" height="16" class="delete-icon"/>
          </div>
        `;
      }
    }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  public rowData: any[] = [{id: 1, categoryName: 'John Doe', subCategoryName: 'Tabla', status: 'Active', createdDate: '2023-10-01'}];
  public isLoading = false;

  constructor(private router: Router,private modalService: NgbModal) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading = true;
    // Replace this with your actual API call
    // this.categoryService.getCategories().subscribe(...)
    this.isLoading = false;
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }

  onCellClicked(event: any) {
    if (event.event.target.classList.contains('edit-icon')) {
      this.router.navigate(['/masters/category-edit', event.data.id]);
    } else if (event.event.target.classList.contains('delete-icon')) {
      const modalRef = this.modalService.open(DeleteConfirmationModalComponent, {
              centered: true,
              backdrop: 'static'
            });
            
            modalRef.componentInstance.title = 'Delete Category';
            modalRef.componentInstance.message = `Are you sure you want to delete Category "${event.data.categoryName}"?`;
            
            modalRef.result.then(
              (result) => {
                if (result === 'delete') {
                  // Handle delete action here
                  console.log('Deleting Category:', event.data.id);
                  // Call your delete API
                }
              },
              (reason) => {
                // Modal dismissed
                console.log('Modal dismissed');
              }
            );
    }
  }
}
