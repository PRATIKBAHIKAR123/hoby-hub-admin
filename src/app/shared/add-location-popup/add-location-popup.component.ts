import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-location-popup',
  templateUrl: './add-location-popup.component.html',
  styleUrls: ['./add-location-popup.component.scss']
})
export class AddLocationPopupComponent {

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  map!: google.maps.Map;
  
  formData = {
    address: '',
    joinedDate: '',
    area: '',
    city: '',
    code: '',
    country: '',
    pincode: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngAfterViewInit() {
    this.initMap();
  }

  initMap() {
    if (!this.mapContainer) return;

    const defaultLocation = { lat: 28.7041, lng: 77.1025 }; // Default to New Delhi (Change as needed)

    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: defaultLocation,
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    new google.maps.Marker({
      position: defaultLocation,
      map: this.map,
      title: "Default Location",
    });
  }

  closeModal() {
    this.activeModal.close();
  }
}
