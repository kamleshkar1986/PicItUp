import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { User } from '../schema/user';
import { map } from 'rxjs/operators';
import { NoteEvent, NotificationMesg, NotificationService, NotificationType } from '@core/services/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private showVerifyOTPSub = new BehaviorSubject<{requestOTP: boolean, otpMailId: string }>({requestOTP: false, otpMailId: null});
  public readonly showVerifyOTPObs: Observable<{requestOTP: boolean, otpMailId: string }> = this.showVerifyOTPSub.asObservable();

  private notify: NotificationMesg = {
    errorEvent: NoteEvent.Auth,
    mesg: "",
    mesgHead: "",
    mesgType: NotificationType.Success
  };

  constructor (
    private apiService: ApiService,
    private notifyServ: NotificationService
  ) {}

  private constructUrl(apiAction: String) {
    return `/auth/${apiAction}/`;
  }

  register(user: User): Observable<any> {      
      return this.apiService.post(this.constructUrl('register'), user)
        .pipe(map(user => {
          if(user.status == 1) {
            this.notify.mesg = "You are sucesfully registered!";
            this.notifyServ.showError(this.notify);
            this.showVerifyOTPSub.next({requestOTP: true, otpMailId: user.data.email});
          }
      }));    
  }

  verifyOTP(otpData: {otp: string, email: string }) {    
    return this.apiService.post(this.constructUrl('verify-otp'), otpData)
        .pipe(map(resp => {          
          if(resp.status == 1) {            
            this.notify.mesg = "You have successfully logged in!";
            this.notify.errorEvent = NoteEvent.Server
            this.notifyServ.showError(this.notify);
            this.showVerifyOTPSub.next({requestOTP: false, otpMailId: null});
          }
      }));    
  }
}
