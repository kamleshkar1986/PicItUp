import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  NoteEvent,
  NotificationMesg,
  NotificationService,
  NotificationType,
} from '@core/services/error';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

export enum AuthMode {
  SignIn = 1,
  SignUp = 2,
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

  errMesg: NotificationMesg = null;

  private alertSub: Subscription;

  showPopUp: boolean = true;

  @ViewChild('closebutton', { static: true }) closebutton: ElementRef;

  constructor(
    private notify: NotificationService,
    private cd: ChangeDetectorRef,
    private userServ: UserService
  ) {}

  ngOnInit() {
    this.authMode = AuthMode.SignIn;
    this.errMesg = null;
    this.alertSub = this.notify.errorPopUp.subscribe((message) => {
      this.errMesg = message;
      if (this.errMesg.mesgType == NotificationType.Success) {
        this.closebutton.nativeElement.click();
        this.showPopUp = false;
      } else if (this.errMesg.errorEvent == NoteEvent.Auth) {
        this.showPopUp = true;
      }
      this.cd.detectChanges();
    });
  }

  toggleAuthMode() {
    if (this.authMode === AuthMode.SignIn) {
      this.authMode = AuthMode.SignUp;
    } else {
      this.authMode = AuthMode.SignIn;
    }
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

  openPasswordChange() {
    this.userServ.showChangePassSub.next(true);
    this.closebutton.nativeElement.click();
  }
}
