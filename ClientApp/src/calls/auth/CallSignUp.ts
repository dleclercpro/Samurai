import CallPOST from '../base/CallPOST';

export class CallSignUp extends CallPOST {

    constructor(username: string, email: string, password: string) {
        super('SignUp', '/auth/sign-up', {
            username,
            email,
            password,
        });
    }
};