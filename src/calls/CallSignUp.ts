import CallPOST from "./CallPOST";

export class SignUpCall extends CallPOST {

    constructor(payload: object) {
        super('user/signup/', payload);
    }
};