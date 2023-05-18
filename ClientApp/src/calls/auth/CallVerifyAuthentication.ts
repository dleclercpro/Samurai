import CallGET from '../base/CallGET';

export class CallVerifyAuthentication extends CallGET {

    constructor() {
        super('VerifyAuthentication', `/auth`);
    }
};