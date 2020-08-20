import Call from './Call';
import { CallType } from '../types/ServerTypes';

class CallHEAD extends Call {

    constructor(name: string, url: string) {
        super(name, url, CallType.HEAD);
    }
}

export default CallHEAD;