import { API_URL } from '../../config';
import CallGET from '../base/CallGET';

export class CallGetFullHand extends CallGET {

    constructor() {
        super('GetFullHand', `${API_URL}/game/hand`);
    }
};