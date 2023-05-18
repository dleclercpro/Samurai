import CallPUT from '../base/CallPUT';

export class CallSignIn extends CallPUT {

    constructor(email: string, password: string, staySignedIn: boolean = true) {
        super('SignIn', '/auth/sign-in', {
            email,
            password,
            staySignedIn,
        });
    }
};