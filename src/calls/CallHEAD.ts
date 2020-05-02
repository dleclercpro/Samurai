import Call from './Call';
import { CallType } from '../types/CallTypes';

class CallHEAD extends Call {

    constructor(name: string, url: string) {
        super(name, url, CallType.HEAD);
    }
}

export default CallHEAD;