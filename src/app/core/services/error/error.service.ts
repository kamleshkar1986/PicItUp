import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMesg, NoteEvent, NotificationMesg} from '.';
import { Notification } from 'rxjs';
import { NotificationType } from './error-data';


@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientError(error: Error): NotificationMesg {
        return {
            errorEvent: NoteEvent.Client,
            mesg: "Some error occurred in the application.",
            mesgHead: "Oops!",
            mesgType: NotificationType.Error
        }
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): NotificationMesg {
        let noteMesg: NotificationMesg = {} as NotificationMesg;
        let errorMesg: ErrorMesg = error.error;
        if(errorMesg.data) {
            noteMesg.mesg = errorMesg.data[0]?.msg ? errorMesg.data[0].msg : errorMesg.message ? errorMesg.message : null;
            noteMesg.errorEvent = errorMesg.message;            
        }   
        else {
            noteMesg.mesg = "Some error occurred while processing the request.";
            noteMesg.errorEvent = NoteEvent.Server           
        }
        noteMesg.mesgHead = "Oops!"
        noteMesg.mesgType = NotificationType.Error;
        return noteMesg;//error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}