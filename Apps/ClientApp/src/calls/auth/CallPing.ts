import CallGET from '../base/CallGET';
import { API_URL } from '../../config';

export class CallPing extends CallGET {

    constructor() {
        super('Ping', `${API_URL}/auth`);
    }
};