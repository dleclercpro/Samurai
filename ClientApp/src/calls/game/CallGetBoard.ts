import CallGET from '../base/CallGET';

export class CallGetBoard extends CallGET {

    constructor(gameId: string) {
        super('GetBoard', `/game/${gameId}`);
    }
};