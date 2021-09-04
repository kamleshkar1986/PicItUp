export enum NotificationType {
    None = 0,
    Success = 1,
    Error = 2,
    Warning = 3
}

export class NoteEvent {
    public static Server = "Server";
    public static Client = "Server";
    public static Auth = "Auth";
}

export interface NotificationMesg {
    mesgType: NotificationType,
    mesgHead: string,
    errorEvent: NoteEvent,
    mesg: string,    
}

interface ErrorData {
    location: string,
    msg: string,
    param: string,
    value: string
}

export interface ErrorMesg {
    status: number,
    message: string,
    data: ErrorData[]
}

