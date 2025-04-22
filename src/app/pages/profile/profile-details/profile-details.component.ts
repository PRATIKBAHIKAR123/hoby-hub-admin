import { Component } from '@angular/core';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent {
  user = {
    name: 'Mayank Kukreti',
    role: 'UI/UX Designer',
    email: 'mayank354@gmail.com',
    joinedDate: '12-01-2025',
    phone: '+914254875267',
    location: 'M245, New York, USA',
    profileImage: 'assets/images/profile-pooja.png' // Update with actual image path
  };

  editProfile() {
    console.log('Edit Profile clicked');
  }

  closeProfile() {
    console.log('Close clicked');
  }
}
