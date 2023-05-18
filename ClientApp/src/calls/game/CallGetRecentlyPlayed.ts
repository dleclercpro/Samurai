import CallGET from '../base/CallGET';

export class CallGetRecentlyPlayed extends CallGET {

    constructor(gameId: string) {
        super('GetRecentlyPlayed', `/game/${gameId}/recent`);
    }
};