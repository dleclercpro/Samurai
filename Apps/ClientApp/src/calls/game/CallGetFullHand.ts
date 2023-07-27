import CallGET from '../base/CallGET';
import { STATIC_URL } from '../../config';

export class CallGetFullHand extends CallGET {

    constructor() {
        super('GetHand', `${STATIC_URL}/hand.json`);
    }
};