import Call from './Call';
import { CallType } from '../types/CallTypes';

class CallGET extends Call {

    constructor(url: string) {
        super(url, CallType.GET);
    }
}

export default CallGET;