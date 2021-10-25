import { ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NoteEvent } from '@core/services/error';
import { NotificationService } from '@core/services/error/notification.service';
import { UserService } from '@data/services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
})
export class UserMenuComponent implements OnInit,OnDestroy {

  private alertSub: Subscription;
  @Input() isAuthenticated = false;
  @ViewChild('btnAcc', { static: true }) btnAcc: ElementRef;
  constructor(private userServ: UserService,private notify: NotificationService,private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.alertSub = this.notify.errorPopUp.subscribe((message) => {
      if (message.errorEvent == NoteEvent.AuthGuardFail) {
        this.btnAcc.nativeElement.click();
      }
      this.cd.detectChanges();
    });
  }

  logout() {
    this.userServ.logout();
  }

  ngOnDestroy() {  
    this.alertSub.unsubscribe(); 
  }

}
