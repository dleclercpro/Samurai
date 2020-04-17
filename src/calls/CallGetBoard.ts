import CallGET from './CallGET';

export class CallGetBoard extends CallGET {

    constructor(gameId: number) {
        super(`game/${gameId}/board/`);
    }
};