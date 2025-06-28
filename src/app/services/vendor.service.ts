import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) {}

  getVendorList(): Observable<[]> {
    return this.http.get<[]>(`${environment.apiUrl}/admin/vendor/get-all`);
  }
}
