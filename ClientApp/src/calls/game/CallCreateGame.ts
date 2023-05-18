import CallPOST from '../base/CallPOST';

export class CallCreateGame extends CallPOST {

    constructor(name: string, opponents: string[]) {
        super('CreateGame', '/game', {
            name,
            opponents,
        });
    }
};