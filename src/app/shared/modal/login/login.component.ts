import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationMesg, NotificationService } from '@core/services/error';
import { Subscription } from 'rxjs';

export enum AuthMode {
  SignIn = 1,
  SignUp = 2
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {

  AuthMode = AuthMode;
  authMode: AuthMode; 

  showModal: boolean = false;  

  errMesg: NotificationMesg = null;

  private alertSub: Subscription; 
  
  constructor(private notify: NotificationService) { }

  ngOnInit() {
    this.authMode = AuthMode.SignIn;
    this.errMesg = null;
    this.alertSub = this.notify.errorPopUp.subscribe(message => {
      this.errMesg = message;
    });
  }

  toggleAuthMode() {
    if(this.authMode === AuthMode.SignIn) {
      this.authMode = AuthMode.SignUp
    }
    else {
      this.authMode = AuthMode.SignIn;
    }
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

}
