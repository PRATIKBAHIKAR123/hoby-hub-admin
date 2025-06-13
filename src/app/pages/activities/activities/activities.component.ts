import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {

      selectedStatus: string = 'All';

    filterAds(status: string) {
        this.selectedStatus = status;
        if (status === 'All') {
            // Load all ads
            //this.loadAllAds();
        } else {
            // Filter ads by status
            //this.loadFilteredAds(status);
        }
    }

   public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'categoryName', headerName: 'Created By', sortable: true, filter: true },
    { field: 'title', headerName: 'Title', sortable: true, filter: true },
    { 
      field: 'status', 
      headerName: 'Type',
    },
        { field: 'title', headerName: 'Session', sortable: true, filter: true },
            { field: 'title', headerName: 'Age', sortable: true, filter: true },
                { field: 'title', headerName: 'Rate', sortable: true, filter: true },
                    { field: 'title', headerName: 'City', sortable: true, filter: true },
    { 
      field: 'createdDate', 
      headerName: 'Posted Date & Time',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    { 
      field: 'createdDate', 
      headerName: 'Approved Date & Time',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return new Date(params.value).toLocaleDateString();
      }
    },
    { 
      field: 'status', 
      headerName: 'Status',
      cellRenderer: (params: any) => {
        return `<span class="badge bg-success">Approved</span>`;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      cellRenderer: (params: any) => {
        return `
          <div class="d-flex gap-2 align-items-center">
          <i width="16" height="16" class="ri ri-view"/>
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

  public rowData: any[] = [{id: 1, categoryName: 'Music', subCategoryName: 'Tabla', status: 'Approved', createdDate: '2023-10-01'}];
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
      
      this.router.navigate(['/activities/activity-edit', event.data.id]);
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
    else  {
this.router.navigate(['/activities/activity-details', event.data.id]);
    }
  }

  

    onFilterTextBoxChanged() {
      let gridApi: GridApi;
  gridApi!.setGridOption(
    "quickFilterText",
    (document.getElementById("filter-text-box") as HTMLInputElement).value,
  );
}
}
