import CallPOST from "./CallPOST";

export class CallSignIn extends CallPOST {

    constructor(payload: object) {
        super('user/signin/', payload);
    }
};