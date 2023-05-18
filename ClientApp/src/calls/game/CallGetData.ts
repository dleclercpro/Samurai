import CallGET from '../base/CallGET';

export class CallGetData extends CallGET {

    constructor(gameId: string, gameVersion: number) {
        super('GetData', `/game/${gameId}/${gameVersion}`);
    }
};