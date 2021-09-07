import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMesg, NoteEvent, NotificationMesg} from '.';
import { NotificationType } from './error-data';


@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientError(error: Error): NotificationMesg {         
        return {
            errorEvent: NoteEvent.Client,
            mesg: "Some error occurred in the application." + error,
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
            noteMesg.mesg = errorMesg.message? errorMesg.message : "Some error occurred while processing the request.";
            noteMesg.errorEvent = NoteEvent.Server; 
            if(error.status == 401) {
                noteMesg.errorEvent = NoteEvent.Auth;  
                if(errorMesg.message == "OTP_Wrong") {
                  noteMesg.errorEvent = NoteEvent.OTP; 
                  noteMesg.mesg = "The OTP that you have provided did not match.";
                }                           
            }                      
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