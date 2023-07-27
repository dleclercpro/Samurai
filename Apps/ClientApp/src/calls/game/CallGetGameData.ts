import CallGET from '../base/CallGET';
import { API_URL } from '../../config';

export class CallGetGameData extends CallGET {

    constructor(gameId: string, gameVersion: number) {
        super('GetGameData', `${API_URL}/game/${gameId}/${gameVersion}`);
    }
};