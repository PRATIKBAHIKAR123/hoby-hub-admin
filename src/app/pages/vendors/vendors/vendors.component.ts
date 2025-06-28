import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ActionButtonsColumnComponent } from 'src/app/shared/action-buttons-column/action-buttons-column.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { DeleteConfirmationModalComponent } from 'src/app/shared/delete-confirmation-modal/delete-confirmation-modal.component';
import { VendorService } from 'src/app/services/vendor.service';



@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
   public columnDefs: ColDef[] = [
    { field: 'id', headerName: 'ID', sortable: true,width:10, filter: true },
    { field: 'name', headerName: 'Vendor Name', sortable: true, filter: true },
    { field: 'email', headerName: 'Email',width:20, sortable: true, filter: true },
    { field: 'phoneNumber', headerName: 'Phone',width:20, sortable: true, filter: true },
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

  constructor(private router: Router,private modalService: NgbModal, private vendorService: VendorService,private toastr: ToastrMessageService) {}

  ngOnInit() {
    this.loadVendors();
  }

  loadVendors() {
    this.isLoading = true;
    // Replace this with your actual API call
    this.vendorService.getVendorList().subscribe((data)=>{
      console.log(data)
      this.rowData = data;
    })
    this.isLoading = false;
  }

  onGridReady(params: GridReadyEvent) {
    params.api.sizeColumnsToFit();
  }



  onEdit(rowData: any) {
  this.router.navigate(['/vendors/edit', rowData.id]);
}

onDelete(rowData: any) {
        const modalRef = this.modalService.open(DeleteConfirmationModalComponent, {
              centered: true,
              backdrop: 'static'
            });
            
            modalRef.componentInstance.title = 'Delete Vendor';
            modalRef.componentInstance.message = `Are you sure you want to delete Vendor "${rowData.name}"?`;
            
            modalRef.result.then(
              (result) => {
                if (result === 'delete') {
                  // Handle delete action here
    //                   this.vendorService.deleteCategory(rowData.id).subscribe({
    //                     next: (data:any) => {
    //             this.toastr.showSuccess('Vendor Deleted Successfully','Delete');
    //             this.loadVendors();
    //         },
    //         error: (error:any) => {
    //             this.isLoading = false;
    //             this.toastr.showError('Error Deleting Vendor', 'Error');
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
}
