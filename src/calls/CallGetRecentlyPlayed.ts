import CallGET from './CallGET';

export class CallGetRecentlyPlayed extends CallGET {

    constructor(gameId: number) {
        super(`game/${gameId}/recent/`);
    }
};