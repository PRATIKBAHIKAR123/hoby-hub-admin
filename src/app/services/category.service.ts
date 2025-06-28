import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }


    getCategories(): Observable<any[]> {
      return this.http.post<any[]>(`${environment.apiUrl}/category/get-all`,{});
    }

        createCategory(data:any): Observable<any[]> {
      return this.http.post<any[]>(`${environment.apiUrl}/category/save`,data);
    }

            updateCategory(data:any): Observable<any[]> {
      return this.http.post<any[]>(`${environment.apiUrl}/category/update`,data);
    }

                deleteCategory(id:any): Observable<any[]> {
      return this.http.delete<any[]>(`${environment.apiUrl}/category/delete?id=${id}`);
    }

    getCategoryDetails(id:any): Observable<any[]>{
      return this.http.get<any[]>(`${environment.apiUrl}/category/get?id=${id}`);
    }
  
    getSubCategories(): Observable<any[]> {
      return this.http.post<any[]>(`${environment.apiUrl}/subcategory/get-all`,{});
    }

    createSubCategory(data:any): Observable<any[]> {
      return this.http.post<any[]>(`${environment.apiUrl}/subcategory/save`,data);
    }

        getSubCategoryDetails(id:any): Observable<any[]>{
      return this.http.get<any[]>(`${environment.apiUrl}/subcategory/get?id=${id}`);
    }

                updateSubCategory(data:any): Observable<any[]> {
      return this.http.post<any[]>(`${environment.apiUrl}/subcategory/update`,data);
    }

                deleteSubCategory(id:any): Observable<any[]> {
      return this.http.delete<any[]>(`${environment.apiUrl}/subcategory/delete?id=${id}`);
    }

}
