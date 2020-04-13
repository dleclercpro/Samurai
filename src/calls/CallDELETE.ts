import Call from './Call';
import { CallType } from '../types/CallTypes';

class CallDELETE extends Call {

    constructor(url: string, payload: object) {
        super(url, CallType.DELETE, payload);
    }
}

export default CallDELETE;