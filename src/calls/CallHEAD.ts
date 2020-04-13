import Call from './Call';
import { CallType } from '../types/CallTypes';

class CallHEAD extends Call {

    constructor(url: string) {
        super(url, CallType.HEAD);
    }
}

export default CallHEAD;