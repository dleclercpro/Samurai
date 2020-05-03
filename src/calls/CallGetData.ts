import CallGET from './CallGET';

export class CallGetData extends CallGET {

    constructor(gameId: number, gameVersion: number) {
        super('GetData', `game/${gameId}/data/${gameVersion}/`);
    }
};