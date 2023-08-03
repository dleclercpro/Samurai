import { SERVER_URL } from '../../config';
import CallGET from '../base/CallGET';

export class CallGetFullHand extends CallGET {

    constructor() {
        super('GetHand', `${SERVER_URL}/static/hand.json`);
    }
};