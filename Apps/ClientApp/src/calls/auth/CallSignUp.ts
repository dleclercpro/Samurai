import CallPOST from '../base/CallPOST';
import { API_URL } from '../../config';

export class CallSignUp extends CallPOST {

    constructor(username: string, email: string, password: string) {
        super('SignUp', `${API_URL}/auth/sign-up`, {
            username,
            email,
            password,
        });
    }
};