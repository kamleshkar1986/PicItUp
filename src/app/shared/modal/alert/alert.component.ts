import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, NotificationMesg, NotificationType, NoteEvent } from '@core/services/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {

  showModal: boolean = false;  

  message: NotificationMesg;

  private alertSub: Subscription; 

  public get mesgType(): typeof NotificationType {
    return NotificationType; 
  }

  constructor(private notify: NotificationService, private cd: ChangeDetectorRef) { }
 
 
  ngOnInit() {
    this.alertSub = this.notify.errorPopUp.subscribe(message => {  
      if(message.mesgType != NotificationType.None && message.errorEvent != NoteEvent.Auth) {
        this.showModal = true;
      }      
      this.message = message;      
      this.cd.detectChanges();
    });
  }

  closeAlert() {
    this.showModal = false;
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.alertSub.unsubscribe();
  }

}
