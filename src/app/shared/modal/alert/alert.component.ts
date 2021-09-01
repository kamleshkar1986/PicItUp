import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, NotificationMesg, NotificationType } from '@core/services/error';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy {

  showModal: boolean = false;  

  message: NotificationMesg;

  //private alertSub: Subscription; 

  public get mesgType(): typeof NotificationType {
    return NotificationType; 
  }

  //constructor(private notify: NotificationService) { }
  constructor() { }

  ngOnInit() {
    // this.alertSub = this.notify.errorPopUp.subscribe(message => {
    //   console.log('my subscriptipn');
    //   if(message.mesgType != NotificationType.None) {
    //     this.showModal = true;
    //   }      
    //   this.message = message;
    // });
  }

  closeAlert() {
    this.showModal = false;
  }

  ngOnDestroy() {
    //this.alertSub.unsubscribe();
  }

}
