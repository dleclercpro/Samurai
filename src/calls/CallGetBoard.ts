import CallGET from "./CallGET";

export class CallGetBoard extends CallGET {

    constructor(game: number) {
        super(`game/${game}/`);
    }
};