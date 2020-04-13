import CallGET from "./CallGET";

export class SignOutCall extends CallGET {

    constructor() {
        super('user/signout/');
    }
};