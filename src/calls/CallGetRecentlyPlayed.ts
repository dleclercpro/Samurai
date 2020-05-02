import CallGET from './CallGET';

export class CallGetRecentlyPlayed extends CallGET {

    constructor(gameId: number) {
        super('GetRecentlyPlayed', `game/${gameId}/recent/`);
    }
};