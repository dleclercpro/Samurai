import CallGET from '../base/CallGET';

export class CallGetGameData extends CallGET {

    constructor(gameId: string, gameVersion: number) {
        super('GetGameData', `/game/${gameId}/${gameVersion}`);
    }
};