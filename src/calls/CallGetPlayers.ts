import CallGET from './CallGET';

export class CallGetPlayers extends CallGET {

    constructor(gameId: number) {
        super('GetPlayers', `game/${gameId}/players/`);
    }
};