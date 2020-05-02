import CallGET from './CallGET';

export class CallGetBoard extends CallGET {

    constructor(gameId: number) {
        super('GetBoard', `game/${gameId}/board/`);
    }
};