import { ErrorHandler, Injectable, Injector, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { LoggingService, ErrorService, NotificationService, ErrorMesg, NotificationMesg } from './error';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

    // Error handling is important and needs to be loaded first.
    // Because of this we should manually inject the services with Injector.
    constructor(private injector: Injector) { }

    handleError(error: Error | HttpErrorResponse) {

        const errorService = this.injector.get(ErrorService);
        const logger = this.injector.get(LoggingService);
        const notifier = this.injector.get(NotificationService);

        let message;
        let stackTrace;
        let notify: NotificationMesg;         

        if (error instanceof HttpErrorResponse) {
            // Server Error     
            notify = errorService.getServerMessage(error);
            stackTrace = errorService.getServerStack(error);     
        } else {
            // Client Error
            notify = errorService.getClientError(error);            
            stackTrace = errorService.getClientStack(error);                    
        }      
        notifier.showError(notify);                 
        
        // Always log errors
        logger.logError(message, stackTrace);

        console.error(error);
    }
}
