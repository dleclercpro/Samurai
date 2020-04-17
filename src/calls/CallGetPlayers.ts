import CallGET from './CallGET';

export class CallGetPlayers extends CallGET {

    constructor(gameId: number) {
        super(`game/${gameId}/players/`);
    }
};