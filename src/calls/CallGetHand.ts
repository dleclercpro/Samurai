import CallGET from './CallGET';

export class CallGetHand extends CallGET {

    constructor(gameId: number) {
        super('GetHand', `game/${gameId}/hand/`);
    }
};