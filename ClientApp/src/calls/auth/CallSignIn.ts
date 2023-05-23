import CallPUT from '../base/CallPUT';
import { API_URL } from '../../config';

export class CallSignIn extends CallPUT {

    constructor(email: string, password: string, staySignedIn: boolean = true) {
        super('SignIn', `${API_URL}/auth/sign-in`, {
            email,
            password,
            staySignedIn,
        });
    }
};