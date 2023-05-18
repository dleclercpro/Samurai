import Call from './Call';
import { CallType } from '../../types/ServerTypes';

class CallPOST extends Call {

    constructor(name: string, url: string, payload: object) {
        super(name, url, CallType.POST, payload);
    }
}

export default CallPOST;