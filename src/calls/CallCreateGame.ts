import CallPOST from './CallPOST';

export class CallCreateGame extends CallPOST {

    constructor(name: string, user: string, opponents: string[]) {
        super('CreateGame', 'game/create/', {
            name,
            user,
            opponents,
        });
    }
};