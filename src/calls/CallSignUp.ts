import CallPOST from './CallPOST';

export class CallSignUp extends CallPOST {

    constructor(username: string, firstName: string, lastName: string, email: string, password: string) {
        super('user/signup/', {
            username,
            firstName,
            lastName,
            email,
            password,
        });
    }
};