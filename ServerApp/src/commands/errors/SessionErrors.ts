import { ServerError } from './ServerError';

export class ErrorMissingSessionId extends ServerError {
    public static code = -200;
    
    constructor() {
        super(ErrorMissingSessionId.code, `Missing session ID.`);
    }
}

export class ErrorInvalidSessionId extends ServerError {
    public static code = -201;
    
    constructor(id: string) {
        super(ErrorInvalidSessionId.code, `Invalid session ID: ${id}.`);
    }
}

export class ErrorExpiredSession extends ServerError {
    public static code = -202;
    
    constructor(id: string) {
        super(ErrorExpiredSession.code, `Expired session ID: ${id}.`);
    }
}