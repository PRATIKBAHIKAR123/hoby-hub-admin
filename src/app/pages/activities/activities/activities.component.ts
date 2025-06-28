import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ActionButtonsColumnComponent } from 'src/app/shared/action-buttons-column/action-buttons-column.component';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent {

  selectedStatus: string = '1';
  searchTxt: string = '';

  filterAds(status: string) {
    this.selectedStatus = status;
    if (status === 'All') {
      this.filterRowData = this.rowData;
      this.gridApi!.setRowData(this.filterRowData);
    } else {
      // Filter ads by status
      this.filterRowData = this.rowData.filter((ad: any) => ad.approved.toString() == status);
      this.gridApi!.setRowData(this.filterRowData);
    }


  }

  public columnDefs: ColDef[] = [
    // { field: 'id', headerName: 'ID', sortable: true, filter: true },
    { field: 'title', headerName: 'Title', sortable: true, filter: true, width: 380, },
    {
      field: 'type',
      headerName: 'Type',
      width: 140,
    },
    { valueGetter: (params) => `${params.data.sessionCountFrom} - ${params.data.sessionCountTo}`, headerName: 'Session', sortable: true, filter: true, width: 180, },
    { valueGetter: (params) => `${params.data.ageRestrictionFrom} - ${params.data.ageRestrictionTo}`, headerName: 'Age', sortable: true, filter: true },
    { field: 'rate', headerName: 'Rate', sortable: true, filter: true },
    { field: 'city', headerName: 'City', sortable: true, filter: true },
    {
      field: 'createdDate',
      headerName: 'Posted Date & Time',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      }
    },
    {
      field: 'createdDate',
      headerName: 'Approved Date & Time',
      sortable: true,
      filter: true,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleDateString() : '';
      }
    },
    {
      field: 'approved',
      headerName: 'Status',
      cellRenderer: (params: any) => {
        var div = `<span class="badge bg-warning">Pending</span>`;
        if (params.value == 0) {
          return div =`<span class="badge bg-warning">Pending</span>`;
        }else if (params.value == 2) {
          return div =`<span class="badge bg-danger">Rejected</span>`;
        }else if (params.value == 3) {
          return div =`<span class="badge bg-info">Approved</span>`;
      }
      return div}
    },
    {
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
    // flex: 1,
    // minWidth: 100,
    resizable: true,
  };

  gridApi: any;

  public rowData: any[] = [];
  public filterRowData: any[] = [];
  public isLoading = false;

  constructor(private router: Router, private modalService: NgbModal, private activityService: ActivityService, private toastr: ToastrMessageService) { }

  ngOnInit() {
    this.loadActivities();
    
  }

  loadCategories() {
    this.isLoading = true;
    // Replace this with your actual API call

  }

  loadActivities() {
    this.isLoading = true;
    //this.gridApi.showLoadingOverlay();
    // Replace this with your actual API call
    this.activityService.getVendorActivities(1).subscribe((data) => {
      this.rowData = data;
      this.filterRowData = data;
      //this.gridApi!.setRowData(this.rowData);
    })
    this.filterAds('1');
    this.isLoading = false;
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi!.sizeColumnsToFit();
  }

  onEdit(rowData: any) {
    this.router.navigate(['activities/activity-edit', rowData.id]);
  }

  onRowClicked(event: any): void {
    const selectedItem = event.data;
    this.router.navigate(['activities/activity-details', selectedItem.id]);  // Example
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
          //                   this.activityService.deleteCategory(rowData.id).subscribe({
          //                     next: (data:any) => {
          //             this.toastr.showSuccess('Category Deleted Successfully','Delete');
          //             this.loadCategories();
          //         },
          //         error: (error:any) => {
          //             this.isLoading = false;
          //             this.toastr.showError('Error Deleting Category', 'Error');
          //         }

          // })
        }
      },
      (reason) => {
        // Modal dismissed
        console.log('Modal dismissed');
      }
    );
  }

  onFilterTextBoxChanged() {
        if( this.searchTxt && this.searchTxt.trim() !== '') {
      this.filterRowData = this.filterRowData.filter((ad: any) => ad.title.toLowerCase().includes(this.searchTxt.toLowerCase()));
    }
    else{
      this.filterRowData = this.rowData;
    }
    this.gridApi!.setRowData(this.filterRowData);
  }
}
