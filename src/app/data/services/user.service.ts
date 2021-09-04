import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApiService } from '@core/services';
import { User } from '../schema/user';
import { map } from 'rxjs/operators';
import { NoteEvent, NotificationMesg, NotificationService, NotificationType } from '@core/services/error';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURLPrefix: string = 'auth';

  private notify: NotificationMesg = {
    errorEvent: NoteEvent.Auth,
    mesg: "",
    mesgHead: "",
    mesgType: NotificationType.Success
  };

  constructor (
    private apiService: ApiService,
    private notifyServ: NotificationService
  ) {}

  private constructUrl(apiAction: String) {
    return `/auth/${apiAction}/`;
  }

  register(user: User): Observable<any> {      
      return this.apiService.post(this.constructUrl('register'), user)
        .pipe(map(user => {
          if(user.status == 1) {
            this.notify.mesg = "You are sucesfully registered!";
            this.notifyServ.showError(this.notify);
          }
      }));    
  }
}
