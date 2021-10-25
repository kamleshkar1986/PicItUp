import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { JwtService } from '@core/services';
import {
  NoteEvent,
  NotificationMesg,
  NotificationService,
  NotificationType,
} from '@core/services/error';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private jwtServ: JwtService,
    private notify: NotificationService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    var currentUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (this.jwtServ.getToken()) {
      if (route.url[0].path === 'product') {
        let updateFieldName = null;
        if (!currentUser.address) {
          updateFieldName = 'address';
        }
        if (!currentUser.mobile) {
          updateFieldName = 'mobile number';
        }
        if (updateFieldName) {
          this.notify.showError({
            mesg: `Please update your ${updateFieldName}.`,
            mesgHead: 'Complete Profile!!',
            errorEvent: NoteEvent.Client,
            mesgType: NotificationType.Error,
          } as NotificationMesg);
          this.router.navigate(['/profile']);
          return false;
        }

      }

      return true;
    }
    // Navigate to the home page
    this.notify.showError({
      mesg: '',
      mesgHead: '',
      errorEvent: NoteEvent.AuthGuardFail,
      mesgType: NotificationType.Error,
    } as NotificationMesg);
    this.router.navigate(['/home']);
    return false;
  }
}
