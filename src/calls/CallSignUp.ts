import CallPOST from "./CallPOST";

export class CallSignUp extends CallPOST {

    constructor(payload: object) {
        super('user/signup/', payload);
    }
};