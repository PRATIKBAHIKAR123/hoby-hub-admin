import { Component } from '@angular/core';

@Component({
  selector: 'app-programs-registered',
  templateUrl: './programs-registered.component.html',
  styleUrls: ['./programs-registered.component.scss']
})
export class ProgramsRegisteredComponent {
 pageTitle:String = 'Programs Registered';

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
  {
    id: '24578164',
    title: 'Annette Black',
    location: 'Mumbai',
    img: 'assets/images/tableTemp/PRImage-1.png',
    status: 'Cancelled',
    approvedDate: '2024-06-15',
    expiryDate: '2024-06-15',
    lastRenewalDate: '2025-01-10',
  },
  {
    id: '24578164',
    title: 'Kristin Waston',
    location: 'Mumbai',
    img: 'assets/images/tableTemp/PRImage-2.png',
    status: 'On Hold',
    approvedDate: '2024-06-15',
    expiryDate: '2024-06-15',
    lastRenewalDate: '2025-01-10',
  },
  {
    id: '24578164',
    title: 'Guy Hawkins',
    location: 'Pune',
    img: 'assets/images/tableTemp/PRImage-3.png',
    status: 'In Registration',
    approvedDate: '2024-06-15',
    expiryDate: '2024-06-15',
    lastRenewalDate: '2025-01-10',
  },
  {
    id: '24578164',
    title: 'Kristin Waston',
    location: 'Mumbai',
    img: 'assets/images/tableTemp/PRImage-4.png',
    status: 'Completed',
    approvedDate: '2024-06-15',
    expiryDate: '2024-06-15',
    lastRenewalDate: '2025-01-10',
  },
  {
    id: '24578164',
    title: 'Annette Black',
    location: 'Mumbai',
    img: 'assets/images/tableTemp/PRImage-5.png',
    status: 'Cancelled',
    approvedDate: '2024-06-15',
    expiryDate: '2024-06-15',
    lastRenewalDate: '2025-01-10',
  },
  {
    id: '24578164',
    title: 'Kristin Waston',
    location: 'Mumbai',
    img: 'assets/images/tableTemp/PRImage-6.png',
    status: 'Cancelled',
    approvedDate: '2024-06-15',
    expiryDate: '2024-06-15',
    lastRenewalDate: '2025-01-10',
  }
];


 constructor() { }

 ngOnInit() {
  
 }
}
