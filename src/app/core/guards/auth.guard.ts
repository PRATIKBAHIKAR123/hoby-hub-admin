import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
// Auth Services
import { LocalStorageServiceService } from '../services/local-storage-service.service';
import { appCommon } from 'src/app/common/_appCommon';
@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router : Router, private localStorageService: LocalStorageServiceService) {}
  
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const tokenInfo = this.localStorageService.getItem(appCommon.LocalStorageKeyType.TokenInfo);
        
        // Check if token exists and is not null/empty
        if (tokenInfo && Object.keys(tokenInfo).length > 0) {
            return true;
        }

        this.router.navigate(['/auth/login']);
        return false;
    }
}
