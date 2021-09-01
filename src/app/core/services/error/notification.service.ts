import { Injectable} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationType, NotificationMesg } from './error-data'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  mesgData: NotificationMesg = {mesg : "", mesgHead: "", mesgType: NotificationType.None};

  errorPopUp = new BehaviorSubject<NotificationMesg>(this.mesgData);

  setMesgData() {    
    this.errorPopUp.next(this.mesgData);  
  }  
  
  showSuccess(message: string): void {
    //this.snackBar.open(message);
  }
  
  showError(message: string): void {    
    this.mesgData = {
      mesgType: NotificationType.Error,
      mesgHead: "Oops!",
      mesg: message
    };   
    this.setMesgData();   
  }
}