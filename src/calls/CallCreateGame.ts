import CallPOST from './CallPOST';

export class CallCreateGame extends CallPOST {

    constructor(name: string, users: string[]) {
        super('game/create/', {
            name,
            users,
        });
    }
};