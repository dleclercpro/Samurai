import CallGET from '../base/CallGET';
import { API_URL } from '../../config';

export class CallSignOut extends CallGET {

    constructor() {
        super('SignOut', `${API_URL}/auth/sign-out`);
    }
};