import Call from './Call';
import { CallType } from '../types/CallTypes';

class CallPOST extends Call {

    constructor(url: string, payload: object) {
        super(url, CallType.POST, payload);
    }
}

export default CallPOST;