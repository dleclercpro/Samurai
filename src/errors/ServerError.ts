export abstract class ServerError extends Error {
    public code: number;
    
    constructor(code: number, message: string) {
        super(message);

        this.code = code;
    }
}



// Generic errors
export class ErrorInvalidParams extends ServerError {
    public static code = -100;
    
    constructor(params?: string[]) {
        super(ErrorInvalidParams.code, params ? `Invalid parameters: ${params}` : `Invalid parameters.`);
    }
}

export class ErrorInvalidEmail extends ServerError {
    public static code = -101;
    
    constructor(email: string) {
        super(ErrorInvalidEmail.code, `Invalid e-mail provided: ${email}`);
    }
}

export class ErrorInvalidPassword extends ServerError {
    public static code = -102;
    
    constructor() {
        super(ErrorInvalidPassword.code, `Invalid password provided.`);
    }
}

export class ErrorNotImplementedYet extends ServerError {
    public static code = -103;

    constructor() {
        super(ErrorNotImplementedYet.code, `Not implemented yet.`);
    }
}