import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { environment } from 'src/environments/environment';

interface ClassDetail {
    title: string | null;
    subCategory: string;
    timingsFrom: string;
    timingsTo: string;
    day: string;
    type: string;
    ageFrom: number;
    ageTo: number;
    sessionFrom: number;
    sessionTo: number | null;
    gender: string;
    fromPrice: number;
    toPrice: number;
}

interface Activity {
    id: number;
    vendorId: number;
    type: string;
    categoryId: number;
    subCategoryId: string | null;
    title: string;
    description: string;
    thumbnailImage: string;
    sessionCountFrom: number;
    sessionCountTo: number;
    ageRestrictionFrom: number;
    ageRestrictionTo: number;
    rate: number;
    currency: string | null;
    address: string | null;
    road: string | null;
    area: string;
    state: string;
    city: string;
    pincode: string;
    country: string;
    longitude: string | null;
    latitude: string | null;
    companyName: string;
    tutorFirstName: string | null;
    tutorLastName: string | null;
    tutorEmailID: string | null;
    tutorCountryCode: string | null;
    tutorPhoneNo: string | null;
    whatsappCountryCode: string | null;
    whatsappNo: string | null;
    tutorIntro: string | null;
    website: string | null;
    classLevel: string | null;
    instagramAcc: string | null;
    youtubeAcc: string | null;
    profileImage: string | null;
    sinceYear: string | null;
    gstNo: string | null;
    iconActivityType: string | null;
    approved: boolean;
    approvedDateTime: string | null;
    isCreatedByAdmin: boolean;
    createdDate: string | null;
    viewCount: number;
    images: string[];
    classDetails: ClassDetail[] | null;
    courseDetails: any[] | null;
}

interface VendorActivity {
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
}

@Component({
    selector: 'app-vendor-details',
    templateUrl: './vendor-details.component.html',
    styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
    activity: Activity | null = null;
    vendorActivities: VendorActivity[] = [];
    isLoading = true;
    selectedActivity: Activity | null = null;
    vendorId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private activityService: ActivityService,
        private modalService: NgbModal,
        private toastr: ToastrMessageService
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.vendorId = +params['id'];
            this.fetchVendorActivities();
        });
    }

    fetchVendorActivities() {
        if (!this.vendorId) return;
        
        this.isLoading = true;
        this.activityService.getVendorActivities(this.vendorId).subscribe({
            next: (data) => {
                this.vendorActivities = data;
                if (data.length > 0) {
                    // Fetch detailed information for the first activity
                    this.fetchActivityDetails(data[0].id);
                } else {
                    this.isLoading = false;
                    this.toastr.showWarning('No activities found for this vendor', 'Warning');
                }
            },
            error: (error) => {
                console.error('Error fetching vendor activities:', error);
                this.isLoading = false;
                this.toastr.showError('Error loading vendor activities', 'Error');
            }
        });
    }

    fetchActivityDetails(activityId: number) {
        this.isLoading = true;
        this.activityService.getActivityById(activityId).subscribe({
            next: (data) => {
                console.log('Activity data:', data);
                console.log('Thumbnail image:', data.thumbnailImage);
                console.log('Gallery images:', data.images);
                console.log('Profile image:', data.profileImage);
                
                // Process image URLs
                if (data.thumbnailImage) {
                    data.thumbnailImage = this.processImageUrl(data.thumbnailImage);
                }
                if (data.images) {
                    data.images = data.images.map((img: string) => this.processImageUrl(img));
                }
                if (data.profileImage) {
                    data.profileImage = this.processImageUrl(data.profileImage);
                }
                
                this.activity = data;
                this.isLoading = false;
            },
            error: (error) => {
                console.error('Error fetching activity details:', error);
                this.isLoading = false;
                this.toastr.showError('Error loading activity details', 'Error');
            }
        });
    }

    private processImageUrl(url: string): string {
        if (!url) return '';
        
        // If the URL is already absolute, return it as is
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        
        // If the URL is relative, prepend the API base URL
        return `${environment.imageUrl}${url.startsWith('/') ? '' : '/'}${url}`;
    }

    openApproveModal(content: any, activity: Activity) {
        if (activity) {
            this.selectedActivity = activity;
            this.modalService.open(content, { centered: true });
        }
    }

    approveActivity() {
        if (this.selectedActivity) {
            this.activityService.approveActivity(this.selectedActivity.id).subscribe({
                next: (response) => {
                    this.modalService.dismissAll();
                    this.toastr.showSuccess(response?.message || 'Activity approved successfully', 'Success');
                    if (this.activity) {
                        this.activity.approved = true;
                    }
                },
                error: (error) => {
                    console.error('Error approving activity:', error);
                    this.toastr.showError('Error approving activity', 'Error');
                }
            });
        }
    }

    // Helper methods for template
    getFullName(): string {
        if (!this.activity) return '';
        const firstName = this.activity.tutorFirstName || '';
        const lastName = this.activity.tutorLastName || '';
        return `${firstName} ${lastName}`.trim();
    }

    getFullAddress(): string {
        if (!this.activity) return '';
        const parts = [
            this.activity.address,
            this.activity.road,
            `${this.activity.area}, ${this.activity.city} - ${this.activity.pincode}`,
            `${this.activity.state}, ${this.activity.country}`
        ].filter(Boolean);
        return parts.join('<br>');
    }

    getPhoneNumber(): string {
        if (!this.activity) return '';
        return `${this.activity.tutorCountryCode || ''} ${this.activity.tutorPhoneNo || ''}`.trim();
    }

    getWhatsappNumber(): string {
        if (!this.activity) return '';
        return `${this.activity.whatsappCountryCode || ''} ${this.activity.whatsappNo || ''}`.trim();
    }

    getGoogleMapsUrl(): string {
        if (!this.activity?.latitude || !this.activity?.longitude) return '';
        return `https://www.google.com/maps?q=${this.activity.latitude},${this.activity.longitude}`;
    }

    onActivitySelect(activityId: number) {
        this.fetchActivityDetails(activityId);
    }
} 