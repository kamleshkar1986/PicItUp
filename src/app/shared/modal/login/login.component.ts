import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NoteEvent, NotificationMesg, NotificationService, NotificationType } from '@core/services/error';
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
  public get mesgType(): typeof NotificationType {
    return NotificationType; 
  }
  public get nevent(): typeof NoteEvent {
    return NoteEvent; 
  }


  showModal: boolean = false;  

  errMesg: NotificationMesg = null;

  private alertSub: Subscription; 
  
  constructor(private notify: NotificationService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.authMode = AuthMode.SignIn;
    this.errMesg = null;    
    this.alertSub = this.notify.errorPopUp.subscribe(message => {     
      this.errMesg = message;
      this.cd.detectChanges();
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
