import CallGET from '../base/CallGET';

export class CallSignOut extends CallGET {

    constructor() {
        super('SignOut', '/auth/sign-out');
    }
};