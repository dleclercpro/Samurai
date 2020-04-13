import CallPOST from "./CallPOST";

export class SignInCall extends CallPOST {

    constructor(payload: object) {
        super('user/signin/', payload);
    }
};