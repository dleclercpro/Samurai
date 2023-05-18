import CallGET from '../base/CallGET';

export class CallGetPlayers extends CallGET {

    constructor(gameId: string) {
        super('GetPlayers', `/game/${gameId}/players`);
    }
};