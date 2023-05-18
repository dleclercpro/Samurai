import CallGET from '../base/CallGET';

export class CallGetHand extends CallGET {

    constructor(gameId: string) {
        super('GetHand', `/game/${gameId}/hand`);
    }
};