import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  getVendorActivities(vendorId: number): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${environment.apiUrl}/admin/activity/get-all?vendorId=${vendorId}`);
  }

  approveActivity(activityId: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/admin/activity/approve`, {
      id: activityId
    });
  }

  // getActivityById(id: number): Observable<any> {
  //   return this.http.get(`${environment.apiUrl}/activity/get?id=${id}`);
  // }

  getActivityById(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/admin/activity/get?id=${id}`);
  }

    registerVendor(formData: FormData): Observable<any> {
    return this.http.post(`${environment.apiUrl}/vendor/register`, formData);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/category/list`);
  }

  getSubCategories(): Observable<any[]> {
    return this.http.post<any[]>(`${environment.apiUrl}/sub-category/list`,{});
  }

} 