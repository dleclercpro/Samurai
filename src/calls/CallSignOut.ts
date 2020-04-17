import CallGET from './CallGET';

export class CallSignOut extends CallGET {

    constructor() {
        super('user/signout/');
    }
};