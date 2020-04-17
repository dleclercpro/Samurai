import CallPOST from './CallPOST';

export class CallSignIn extends CallPOST {

    constructor(email: string, password: string) {
        super('user/signin/', {
            email,
            password,
        });
    }
};