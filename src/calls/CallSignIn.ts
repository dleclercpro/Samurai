import CallPOST from './CallPOST';

export class CallSignIn extends CallPOST {

    constructor(email: string, password: string) {
        super('SignIn', 'user/signin/', {
            email,
            password,
        });
    }
};