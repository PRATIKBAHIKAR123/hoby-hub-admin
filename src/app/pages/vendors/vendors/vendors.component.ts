import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

interface Vendor {
  id: number;
  name: string;
  email: string | null;
  phoneNumber: string;
  createdDate: string;
}

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent implements OnInit {
  // Preserving existing table data as commented code
  /*
  tableData = [
    {
      id: '24578164',
      title: 'Bessie Cooper',
      location: 'Pune',
      img: 'assets/images/tableTemp/PRImage.png',
      status: 'Active',
      approvedDate: '2024-06-15',
      expiryDate: '2024-06-15',
      lastRenewalDate: '2025-01-10',
    },
    // ... rest of the existing data
  ];
  */

  vendors: Vendor[] = [];
  isLoading = true;
  
  // Pagination properties
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;
  paginatedVendors: Vendor[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchVendors();
  }

  fetchVendors() {
    this.isLoading = true;
    this.http.get<Vendor[]>(`${environment.apiUrl}/admin/vendor/get-all`)
      .subscribe({
        next: (data) => {
          this.vendors = data;
          this.totalItems = data.length;
          this.updatePaginatedData();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error fetching vendors:', error);
          this.isLoading = false;
        }
      });
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  private updatePaginatedData() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedVendors = this.vendors.slice(startIndex, endIndex);
  }

  navigateToVendorDetails(vendorId: number) {
    const vendor = this.vendors.find(v => v.id === vendorId);
    if (vendor) {
      localStorage.setItem('currentVendor', JSON.stringify(vendor));
    }
    this.router.navigate(['/vendors', vendorId]);
  }
}
