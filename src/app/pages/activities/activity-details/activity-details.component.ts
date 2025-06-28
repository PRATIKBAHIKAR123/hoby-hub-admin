import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { ActivityService } from 'src/app/services/activity.service';
import { environment } from 'src/environments/environment';
import { Activity, VendorActivity } from '../add-new-ad/activity.model';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.scss']
})
export class ActivityDetailsComponent {
    activity: Activity | null = null;
    vendorActivities: VendorActivity[] = [];
    isLoading = true;
    selectedActivity: Activity | null = null;
    vendorId: number | null = null;

    constructor(
        private route: ActivatedRoute,
        private activityService: ActivityService,
        private modalService: NgbModal,
        private toastr: ToastrMessageService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const activityId = +params['id'];
            this.fetchActivityDetails(activityId);
        });
    }

    // fetchVendorActivities() {
    //     if (!this.vendorId) return;
        
    //     this.isLoading = true;
    //     this.activityService.getVendorActivities(this.vendorId).subscribe({
    //         next: (data) => {
    //             this.vendorActivities = data;
    //             if (data.length > 0) {
    //                 // Fetch detailed information for the first activity
    //                 this.fetchActivityDetails(data[0].id);
    //             } else {
    //                 this.isLoading = false;
    //                 this.toastr.showWarning('No activities found for this vendor', 'Warning');
    //             }
    //         },
    //         error: (error) => {
    //             console.error('Error fetching vendor activities:', error);
    //             this.isLoading = false;
    //             this.toastr.showError('Error loading vendor activities', 'Error');
    //         }
    //     });
    // }

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

    onEditActivity() {
       this.router.navigate(['/activities/activity-edit', this.activity!.id]);
    }
}
