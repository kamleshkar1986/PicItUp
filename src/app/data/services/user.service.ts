import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';

import { ApiService, JwtService } from '@core/services';
import { User, UserAddress } from '../schema/user';
import { catchError, map } from 'rxjs/operators';
import { NoteEvent, NotificationMesg, NotificationService, NotificationType } from '@core/services/error';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private loggedInUser: User = null;
  private loggedInUserSub = new BehaviorSubject<User>(this.loggedInUser);
  public readonly loggedInUserObs: Observable<User> = this.loggedInUserSub.asObservable();

  private showVerifyOTPSub = new BehaviorSubject<{requestOTP: boolean, otpMailId: string }>({requestOTP: false, otpMailId: null});
  public readonly showVerifyOTPObs: Observable<{requestOTP: boolean, otpMailId: string }> = this.showVerifyOTPSub.asObservable();

  public showChangePassSub = new BehaviorSubject<boolean>(false);

  private notify: NotificationMesg = {
    errorEvent: NoteEvent.Auth,
    mesg: "",
    mesgHead: "",
    mesgType: NotificationType.Success
  };

  constructor (
    private apiService: ApiService,
    private notifyServ: NotificationService,
    private jwtService: JwtService,
    private route: Router
  ) {}

  private constructUrl(apiAction: String) {
    return `/auth/${apiAction}/`;
  }

  private constructUserUrl(apiAction: String) {
    return `/user/${apiAction}/`;
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

  resendOTP() {    
    return this.apiService.post(this.constructUrl('resend-verify-otp'), {email: this.loggedInUser.email})
        .pipe(map(resp => {             
          if(resp.status == 1) {    
            this.notify.mesg = "A new otp has been emailed to you.";
            this.notify.errorEvent = NoteEvent.Server;
            this.notifyServ.showError(this.notify);
          }          
      }));    
  }

  login(user: User): Observable<any> {  
    this.loggedInUser = user;
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
          this.loggedInUser = userResp.data;
          this.loggedInUserSub.next(this.loggedInUser); 
          this.jwtService.saveToken(userResp.data.token);  
          localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));           
        }
      }),
      catchError(err => {         
        if(err.error.message == "OTP_Pending") {  
          this.resendOTP().subscribe();          
          this.promptOTPRequest(user.email);
        }  
        return throwError(err);  
      })
    );   
  }

  autoLogin() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));        
    if(this.jwtService.getToken()) {
      this.loggedInUserSub.next(this.loggedInUser);    
    }
  }

  logout() {
    this.loggedInUser = null;
    this.route.navigate(['/home']);
    this.loggedInUserSub.next(this.loggedInUser); 
    this.jwtService.destroyToken();    
    this.notify.mesg = "You are logged out!";
    this.notify.errorEvent = NoteEvent.Client;
    this.notifyServ.showError(this.notify);
    localStorage.removeItem('loggedInUser');    
  }

  getPasswordChangeOTP(email: string): Observable<any>{    
    return this.apiService.post(this.constructUrl('change-pass-otp'), {email: email})
        .pipe(map(resp => {             
          if(resp.status == 1) {    
            //this.login(this.loggedInUser).subscribe();       
            // this.notify.mesg = "You have successfully logged in!";
            // this.notify.errorEvent = NoteEvent.Server
            // this.notifyServ.showError(this.notify);
            // this.showVerifyOTPSub.next({requestOTP: false, otpMailId: null});
            return true;
          }          
      }))  
  }

  changePasswordByOTP(email: string, otp: string, newPass: string): Observable<any>{    
    return this.apiService.post(this.constructUrl('change-pass-by-otp'), {email: email, otp: otp, newPassword: newPass})
        .pipe(map(resp => {             
          if(resp.status == 1) {   
            this.notify.mesg = "Your password has been changed successfully! Please use the new password to login.";
            this.notify.errorEvent = NoteEvent.Server
            this.notifyServ.showError(this.notify);
            this.showVerifyOTPSub.next({requestOTP: false, otpMailId: null});
            return true;
          }          
      }))  
  }

  updateProfile(user: User): Observable<any> {    
    return this.apiService.post(this.constructUserUrl('update-profile'), user)
      .pipe(map(resp => {
        if(resp.status == 1) {
          this.notify.mesg = "Your profile has been updated successfully!";
            this.notify.errorEvent = NoteEvent.Server
            this.notifyServ.showError(this.notify);    
            this.loggedInUser = user;      
            this.loggedInUserSub.next(this.loggedInUser);        
            localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));           
            return true;
        }              
    }));    
  }

  updateAddress(addr: UserAddress) {
    return this.apiService.post(this.constructUserUrl('update-address'), {email: this.loggedInUser.email, ...addr})
      .pipe(map(resp => {
        if(resp.status == 1) {
          this.notify.mesg = "Your deliver address has been updated successfully!";
            this.notify.errorEvent = NoteEvent.Server
            this.notifyServ.showError(this.notify);    
            this.loggedInUser.address = addr;      
            this.loggedInUserSub.next(this.loggedInUser);        
            localStorage.setItem('loggedInUser', JSON.stringify(this.loggedInUser));           
            return true;
        }              
    }));    
  }

  private promptOTPRequest(otpMailId: string) {
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
