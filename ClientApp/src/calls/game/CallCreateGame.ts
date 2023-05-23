import CallPOST from '../base/CallPOST';
import { API_URL } from '../../config';

export class CallCreateGame extends CallPOST {

    constructor(name: string, opponents: string[]) {
        super('CreateGame', `${API_URL}/game`, {
            name,
            opponents,
        });
    }
};