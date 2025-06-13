import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { latLng, tileLayer, Map, Marker, marker, LeafletMouseEvent } from 'leaflet';
import { HttpClient } from '@angular/common/http';
import { GlobalComponent } from 'src/app/global-component';
import * as L from 'leaflet';

declare var google: any;

@Component({
  selector: 'app-add-location-popup',
  templateUrl: './add-location-popup.component.html',
  styleUrls: ['./add-location-popup.component.scss']
})
export class AddLocationPopupComponent implements OnInit, AfterViewInit {
  locationForm: FormGroup;
  wasSubmitted = false;
  isSubmitting = false;
  selectedPlace: any = null;

  @ViewChild('mapContainer', { static: false }) mapContainer!: ElementRef;
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  icon = {
    icon: L.icon({
      iconSize: [ 25, 41 ],
      iconAnchor: [ 13, 0 ],
      // specify the path here
      iconUrl: 'assets/images/icons/marker.png',
   })
};

  leafletOptions = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap contributors'
      })
    ],
    zoom: 13,
    center: latLng(19.076, 72.8777) // Default to Mumbai
  };
  leafletMap!: Map;
  leafletMarker!: Marker;

  constructor(
    private fb: FormBuilder,
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) {
    this.locationForm = this.fb.group({
      search: [''],
      address: ['', Validators.required],
      road: ['', Validators.required],
      area: ['', Validators.required],
      city: ['', Validators.required],
      state: [''],
      country: [''],
      pincode: [''],
    });
  }

  ngOnInit(): void {
    // Optionally set initial marker if editing
  }

  ngAfterViewInit(): void {
    // Google Places Autocomplete
    if ((window as any).google && this.searchInput) {
      // Ensure input is not covered by Angular's change detection
      setTimeout(() => {
        const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement, {
          // types: ['geocode'],
          // componentRestrictions: { country: 'in' },
        });
        autocomplete.addListener('place_changed', () => {
          console.log('Place changed');
          const place = autocomplete.getPlace();
          if (place && place.geometry) {
            const loc = place.geometry.location;
            this.selectedPlace = { lat: loc.lat(), lng: loc.lng() };
            this.locationForm.patchValue({
              latitude: loc.lat(),
              longitude: loc.lng(),
              search: place.formatted_address
            });
            this.fillAddressFields(place);
            if (this.leafletMap) {
              if (this.leafletMarker) this.leafletMap.removeLayer(this.leafletMarker);
              this.leafletMarker = marker([loc.lat(), loc.lng()]).addTo(this.leafletMap);
              this.leafletMap.setView([loc.lat(), loc.lng()], 16);
            }
          }
        });
      }, 0);
    }
  }

  onMapReady(map: Map) {
    this.leafletMap = map;
    // Optionally add marker if form has lat/lng
  }

  // Google Maps Geocoding API key (replace with your actual key)
  private googleApiKey = GlobalComponent.GOOGLE_MAPS_API_KEY;

  // Called when user clicks on map
  onMapClick(event: any) {
    const coords = event.latlng;
    if (this.leafletMarker) {
      this.leafletMap.removeLayer(this.leafletMarker);
    }
    this.leafletMarker = marker([coords.lat, coords.lng],this.icon).addTo(this.leafletMap);
    this.locationForm.patchValue({
      latitude: coords.lat,
      longitude: coords.lng
    });
    this.selectedPlace = { lat: coords.lat, lng: coords.lng };
    // Optionally, auto-fill address fields
    this.reverseGeocode(coords.lat, coords.lng);
  }

  onSearchInput(event: Event): void {
    // No-op: handled by Google Places Autocomplete
  }

  // Called when user clicks 'Search By Location'
  onSearchLocation() {
    const search = this.locationForm.get('search')?.value;
    if (search) {
      this.geocodeAddress(search);
    } else if (this.selectedPlace) {
      this.reverseGeocode(this.selectedPlace.lat, this.selectedPlace.lng);
    }
  }

  // Geocode address string to lat/lng and fill form
  geocodeAddress(address: string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${this.googleApiKey}`;
    this.http.get<any>(url).subscribe(res => {
      if (res.status === 'OK' && res.results.length > 0) {
        const result = res.results[0];
        const loc = result.geometry.location;
        this.locationForm.patchValue({
          latitude: loc.lat,
          longitude: loc.lng
        });
        this.fillAddressFields(result);
        // Move marker on map
        if (this.leafletMap) {
          if (this.leafletMarker) this.leafletMap.removeLayer(this.leafletMarker);
          this.leafletMarker = marker([loc.lat, loc.lng]).addTo(this.leafletMap);
          this.leafletMap.setView([loc.lat, loc.lng], 16);
        }
      }
    });
  }

  // Reverse geocode lat/lng to address and fill form
  reverseGeocode(lat: number, lng: number) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.googleApiKey}`;
    this.http.get<any>(url).subscribe(res => {
      if (res.status === 'OK' && res.results.length > 0) {
        this.fillAddressFields(res.results[0]);
      }
    });
  }

  // Fill address fields from Google Maps geocode result
  fillAddressFields(result: any) {
    let address = '', road = '', area = '', city = '', state = '', country = '', pincode = '';
    const comps = result.address_components || result.addressComponents || [];
    for (const comp of comps) {
      if (comp.types.includes('street_number')) address = comp.long_name + ' ' + address;
      if (comp.types.includes('route')) road = comp.long_name;
      if (comp.types.includes('sublocality') || comp.types.includes('sublocality_level_1')) area = comp.long_name;
      if (comp.types.includes('locality')) city = comp.long_name;
      if (comp.types.includes('administrative_area_level_1')) state = comp.long_name;
      if (comp.types.includes('country')) country = comp.long_name;
      if (comp.types.includes('postal_code')) pincode = comp.long_name;
    }
    this.locationForm.patchValue({
      address: address.trim() || result.formatted_address || result.name,
      road,
      area,
      city,
      state,
      country,
      pincode
    });
  }

  onSubmit(): void {
    this.wasSubmitted = true;
    if (this.locationForm.invalid) return;
    this.isSubmitting = true;
    // Placeholder: Save logic, emit result, etc.
    setTimeout(() => {
      this.isSubmitting = false;
      this.activeModal.close(this.locationForm.value);
    }, 1000);
  }

  onCancel(): void {
    this.activeModal.dismiss('cancel');
  }
}
