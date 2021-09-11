import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss'],
})
export class RecoverPasswordComponent implements OnInit {

  showPopUp: boolean = true;
  otpSent: boolean = false;
  otpInput: string = "";
  passwordInput: string = "";
  otpEmailId: string = "";
  invalidInput: boolean = false;
  message: string = null;
  //passChanModel: { otp: string, newPassword: string } = null;
  userSub: Subscription;

  constructor(private userServ: UserService) { }

  ngOnInit() {   
    this.dispPopUp(false);
    this.userServ.showChangePassSub.subscribe(show => {
      this.dispPopUp(show);
    });
  }

  dispPopUp(show: boolean) {
    this.showPopUp = show;
  }

  submitEmail() {
    this.invalidInput = false;
    if(!this.validateEmail(this.otpEmailId)) {
      this.invalidInput = true;
      return;
    }
    this.userServ.getPasswordChangeOTP(this.otpEmailId).subscribe(resp => {      
        this.otpSent = resp;     
    });  
  }

  private validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  
  changePassword(changePass: NgForm) {
    if(changePass.valid) {     
      this.userServ.changePasswordByOTP(this.otpEmailId, this.otpInput, this.passwordInput).subscribe(
        resp => {
          if(resp == true) {
            this.dispPopUp(false);
          }
        }
      );          
    }
  }

  submitOTP() {    
   
  }

  resendOTP() {
   
  }

}
