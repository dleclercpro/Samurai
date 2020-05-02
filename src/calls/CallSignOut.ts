import CallGET from './CallGET';

export class CallSignOut extends CallGET {

    constructor() {
        super('SignOut', 'user/signout/');
    }
};