import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NoteEvent, NotificationService, NotificationType } from '@core/services/error';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss'],
})
export class VerifyOtpComponent implements OnInit, OnDestroy {

  showPopUp: boolean = true;
  otpMailId: string = null;
  otpInput: string = "";
  invalidInput: boolean = false;
  message: string = null;
  private userSub: Subscription;
  private errorMesgSub: Subscription; 


  constructor(private notify: NotificationService, private userServ: UserService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.userSub = this.userServ.showVerifyOTPObs.subscribe(showPopUp => {       
      this.dispPopUp(showPopUp.requestOTP);
      this.otpMailId = showPopUp.otpMailId;
      this.cd.detectChanges();
    });   

    this.errorMesgSub = this.notify.errorPopUp.subscribe(message => {  
      if(
          message.mesgType != NotificationType.None && 
          (message.errorEvent == NoteEvent.OTP)
        ) {
        this.message = message.mesg;       
        this.cd.detectChanges();
      }   
    });
  }

  dispPopUp(show: boolean) {
    this.showPopUp = show;
  }

  submitOTP() {    
    this.otpMailId = "kamlesh.pikachu@gmail.com";    
    this.invalidInput = false;
    if(this.otpInput.length < 4 || isNaN(+this.otpInput)) {
      this.invalidInput = true;
    } 
    else {
      this.userServ.verifyOTP({email: this.otpMailId, otp: this.otpInput}).subscribe(resp => {
      });
    }   
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.errorMesgSub.unsubscribe();
  }

}
