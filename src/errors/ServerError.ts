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
    
    public params: string[];
    
    constructor(params: string[]) {
        if (params.length === 0) throw new Error('No invalid parameters specified!');

        super(ErrorInvalidParams.code, params ? `Invalid parameters: ${params.join(', ')}` : `Invalid parameters.`);

        this.params = params;
    }

    public getParams() {
        return this.params;
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