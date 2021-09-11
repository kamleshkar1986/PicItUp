import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationType, NotificationMesg, ErrorMesg } from './error-data'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private mesgData: NotificationMesg = {mesg : "", mesgHead: "", errorEvent: "", mesgType: NotificationType.None};

  errorPopUp = new BehaviorSubject<NotificationMesg>(this.mesgData);

  private setMesgData() {    
    this.errorPopUp.next(this.mesgData);
  }  
  
  showSuccess(message: string): void {
    //this.snackBar.open(message);
  }
  
  showError(notify: NotificationMesg): void {     
    this.mesgData = notify
    this.setMesgData();   
  }
}