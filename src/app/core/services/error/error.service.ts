import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMesg } from '.';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    getClientMessage(error: Error): string {
        if (!navigator.onLine) {
            return 'No Internet Connection';
        }        
        const errorResp: ErrorMesg = <any>error;     
        return errorResp?.data[0]?.msg ? errorResp.data[0].msg : errorResp.message ? errorResp.message : errorResp.toString();
    }

    getClientStack(error: Error): string {
        return error.stack;
    }

    getServerMessage(error: HttpErrorResponse): string {
        return error.message;
    }

    getServerStack(error: HttpErrorResponse): string {
        // handle stack trace
        return 'stack';
    }
}