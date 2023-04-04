import { IUser } from '../models/User';
import { ServerError } from './ServerError';

export class ErrorUserAlreadyExists extends ServerError {
    public static code = -300;
    
    constructor(user: IUser) {
        super(ErrorUserAlreadyExists.code, `User already exists: ${user.stringify()}`);
    }
}

export class ErrorUserDoesNotExist extends ServerError {
    public static code = -301;

    constructor(email: string) {
        super(ErrorUserDoesNotExist.code, `User does not exist: ${email}`);
    }
}

export class ErrorUserWrongPassword extends ServerError {
    public static code = -302;
    
    constructor(email: string) {
        super(ErrorUserWrongPassword.code, `Wrong password entered for user: ${email}`);
    }
}