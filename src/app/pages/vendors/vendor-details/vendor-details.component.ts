import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';

interface Vendor {
    id: number;
    name: string;
    email: string | null;
    phoneNumber: string;
    createdDate: string;
    title?: string;
    subtitle?: string;
    sinceYear?: string;
    description?: string;
    profileImageUrl?: string;
    galleryImages?: string[];
    ageRestriction?: string;
    session?: string;
    rate?: string;
    language?: string;
    classes?: {
        type: string;
        weekDay: string;
        time: string;
        age: string;
        session: string;
        gender: string;
        price: string;
    }[];
    institute?: string;
    hhId?: string;
    intro?: string;
    website?: string;
    whatsapp?: string;
    address?: string;
    addressUrl?: string;
}

interface Activity {
    id: number;
    vendorId: number;
    type: string;
    categoryId: number;
    subCategoryId: number | null;
    title: string;
    description: string;
    thumbnailImage: string;
    sessionCountFrom: number;
    sessionCountTo: number;
    ageRestrictionFrom: number;
    ageRestrictionTo: number;
    area: string;
    state: string;
    city: string;
    pincode: string;
    country: string;
    viewCount: number;
    distanceInKm: number;
    status: string;
    createdDate: string;
}

@Component({
    selector: 'app-vendor-details',
    templateUrl: './vendor-details.component.html',
    styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
    vendor: Vendor | null = null;
    activities: Activity[] = [];
    isLoading = true;
    selectedActivity: Activity | null = null;

    constructor(
        private route: ActivatedRoute,
        private activityService: ActivityService,
        private modalService: NgbModal,
        private toastr: ToastrMessageService
    ) { }

    ngOnInit() {
        // Get vendor details from localStorage
        const storedVendor = localStorage.getItem('currentVendor');
        if (storedVendor) {
            this.vendor = JSON.parse(storedVendor);
        }

        // Get vendor ID from route params
        this.route.params.subscribe(params => {
            const vendorId = +params['id'];
            this.fetchActivities(vendorId);
        });
    }

    fetchActivities(vendorId: number) {
        this.isLoading = true;
        this.activityService.getVendorActivities(vendorId).subscribe({
            next: (data) => {
                this.activities = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error fetching activities:', error);
                this.isLoading = false;
            }
        });
    }

    openApproveModal(content: any, activity: Activity) {
        this.selectedActivity = activity;
        this.modalService.open(content, { centered: true });
    }

    approveActivity() {
        if (this.selectedActivity) {
            this.activityService.approveActivity(this.selectedActivity.id).subscribe({
                next: () => {
                    this.modalService.dismissAll();
                    this.toastr.showSuccess('Activity approved successfully', 'Success');
                },
                error: (error) => {
                    console.error('Error approving activity:', error);
                }
            });
        }
    }
} 