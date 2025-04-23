import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalStorageServiceService } from '../../core/services/local-storage-service.service';
import { ToastrMessageService } from 'src/app/core/services/toastr-message.service';
import { appCommon } from 'src/app/common/_appCommon';

interface LoginResponse {
  Name: string;
  UserName: string;
  ProfileImage: string | null;
  Role: string;
  AccessToken: string;
  RefreshToken: string;
  ForcePwdChange: boolean;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

/**
 * Login Component
 */
export class LoginComponent implements OnInit {

  // Login Form
  loginForm!: UntypedFormGroup;
  submitted = false;
  fieldTextType!: boolean;
  error = '';
  returnUrl!: string;
  loading = false;
  // set the current year
  year: number = new Date().getFullYear();

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private localStorageService: LocalStorageServiceService,
    public toastService: ToastrMessageService
  ) {
    // redirect to home if already logged in
    if (this.localStorageService.getItem('userData')) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    if (this.localStorageService.getItem('userData')) {
      this.router.navigate(['/']);
    }
    /**
     * Form Validatyion
     */
    this.loginForm = this.formBuilder.group({
      username: [environment.username, [Validators.required]],
      password: [environment.password, [Validators.required]],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  /**
   * Form submit
   */
  onSubmit() {
    this.submitted = true;
    this.loading = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    const credentials = {
      username: this.f['username'].value,
      password: this.f['password'].value
    };

    this.http.post<LoginResponse>(`${environment.apiUrl}/admin/login`, credentials)
      .subscribe({
        next: (response) => {
          // Store user data and tokens
          this.localStorageService.setItem(appCommon.LocalStorageKeyType.TokenInfo, response);

          // Show success message
          this.toastService.showSuccess('Login successful', 'Success');

          // Redirect to dashboard
          this.router.navigate(['/']);
        },
        error: (error) => {
          this.error = error.error?.message || 'Login failed';
          this.loading = false;
          this.toastService.showError(this.error, 'Error');
        }
      });
  }

  /**
   * Password Hide/Show
   */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

}
