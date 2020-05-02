import CallGET from './CallGET';

export class CallVerifyAuthentication extends CallGET {

    constructor() {
        super('VerifyAuthentication', `user/`);
    }
};