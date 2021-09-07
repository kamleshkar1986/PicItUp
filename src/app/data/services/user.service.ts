import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { ApiService } from '@core/services';
import { User } from '../schema/user';
import { catchError, map } from 'rxjs/operators';
import { NoteEvent, NotificationMesg, NotificationService, NotificationType } from '@core/services/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser: User = null;
  private loggedInUserSub = new BehaviorSubject<User>(this.loggedInUser);
  public readonly loggedInUserObs: Observable<User> = this.loggedInUserSub.asObservable();

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
      this.setLoggedInUserData(user);     
      return this.apiService.post(this.constructUrl('register'), user)
        .pipe(map(user => {
          if(user.status == 1) {
            this.promptOTPRequest(user.data.email);
          }
      }));    
  }

  verifyOTP(otpData: {otp: string, email: string }) {    
    return this.apiService.post(this.constructUrl('verify-otp'), otpData)
        .pipe(map(resp => {             
          if(resp.status == 1) {    
            this.login(this.loggedInUser).subscribe();       
            // this.notify.mesg = "You have successfully logged in!";
            // this.notify.errorEvent = NoteEvent.Server
            // this.notifyServ.showError(this.notify);
            // this.showVerifyOTPSub.next({requestOTP: false, otpMailId: null});
          }          
      }));    
  }

  login(user: User): Observable<any> {  
    return this.apiService.post(this.constructUrl('login'), user)
      .pipe(map(userResp => {                
        if(userResp.status == 1) {
          this.notify.mesg = "You have successfully logged in!";
          this.notify.errorEvent = NoteEvent.Server
          this.notifyServ.showError(this.notify);
          this.showVerifyOTPSub.next({requestOTP: false, otpMailId: null});
          const expiraTionDate = new Date(
            new Date().getTime() + 2*60*1000
          );
          this.loggedInUser = new User(
            userResp.data.firstName, 
            userResp.data.lastName, 
            userResp.data.email, 
            userResp.data.token, 
            expiraTionDate
          );
          this.loggedInUserSub.next(this.loggedInUser);          
        }
      }),
      catchError(err => {         
        if(err.error.message == "OTP_Pending") {            
          this.promptOTPRequest(user.email);
        }  
        return throwError(err);  
      })
    );   
  }

  promptOTPRequest(otpMailId: string) {
    this.notify.mesg = "You are sucesfully registered!";
    //hides the login popup
    this.notifyServ.showError(this.notify);
    //Shows OTP input popup for user to submit otp
    this.showVerifyOTPSub.next({requestOTP: true, otpMailId: otpMailId});
  } 

  private setLoggedInUserData(user: User) {
    this.loggedInUser = user;
  }
}
