import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/auth.service';
import { appCommon } from 'src/app/common/_appCommon';
import { LocalStorageServiceService } from '../services/local-storage-service.service';

@Injectable()
export class httpInterceptor implements HttpInterceptor {

  public appCommon = appCommon;

  constructor(private authServiceService: AuthenticationService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  // Skip adding Authorization for Google Maps API
  if (request.url.includes('maps.googleapis.com')) {
    return next.handle(request);
  }

  let tokenInfo = this.authServiceService.getTokenInfo();
  let cloneReq = request;

  if (tokenInfo && tokenInfo.AccessToken) {
    cloneReq = request.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenInfo.AccessToken}`
      }
    });
  }

  return next.handle(cloneReq);
}

}
