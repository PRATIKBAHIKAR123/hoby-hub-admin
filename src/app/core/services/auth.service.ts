import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User } from '../models/auth.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { GlobalComponent } from "../../global-component";
import { appCommon } from 'src/app/common/_appCommon';
import { LocalStorageServiceService } from './local-storage-service.service';
import { Router } from '@angular/router';
import { ToastrMessageService } from './toastr-message.service';
const AUTH_API = GlobalComponent.AUTH_API;

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    user: any;
}

@Injectable({ providedIn: 'root' })

/**
 * Auth-service Component
 */
export class AuthenticationService {

    user!: User;
    currentUserValue: any;
    private currentUserSubject: BehaviorSubject<User>;
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private localStorageService: LocalStorageServiceService, private router: Router, private toastrMessageService: ToastrMessageService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')!));
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, first_name: string, password: string) {
        // return getFirebaseBackend()!.registerUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        // Register Api
        return this.http.post(AUTH_API + 'signup', {
            email,
            first_name,
            password,
        }, httpOptions);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        // return getFirebaseBackend()!.loginUser(email, password).then((response: any) => {
        //     const user = response;
        //     return user;
        // });

        return this.http.post(AUTH_API + 'signin', {
            email,
            password
        }, httpOptions);
    }

    /**
     * Returns the current user
     */
    public currentUser(): any {
        return getFirebaseBackend()!.getAuthenticatedUser();
    }

    /**
     * Logout the user
     */
    logout() {
        this.localStorageService.removeItem(appCommon.LocalStorageKeyType.TokenInfo);
        this.router.navigate(['/auth/login']);
        this.toastrMessageService.showSuccess("You have been logout.", "Success");
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend()!.forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    loginWithCredentials(credentials: LoginCredentials): Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/admin/login`, credentials);
    }

    // Store the token in localStorage
    setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    // Get the token from localStorage
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    // Check if user is logged in
    isLoggedIn(): boolean {
        return !!this.getToken();
    }

    public getTokenInfo() {
        return this.localStorageService.getItem(appCommon.LocalStorageKeyType.TokenInfo);
    }
}

