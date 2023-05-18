import CallGET from '../base/CallGET';

export class CallPing extends CallGET {

    constructor() {
        super('Ping', `/auth`);
    }
};