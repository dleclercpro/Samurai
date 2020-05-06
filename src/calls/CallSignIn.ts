import CallPOST from './CallPOST';

export class CallSignIn extends CallPOST {

    constructor(identifier: string, password: string) {
        super('SignIn', 'user/signin/', {
            identifier,
            password,
        });
    }
};