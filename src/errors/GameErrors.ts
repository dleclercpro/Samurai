import { IGame } from '../models/Game';
import { IUser } from '../models/User';
import { ServerError } from './ServerError';

export class ErrorGameDoesNotExist extends ServerError {
    public static code = -400;
    
    constructor(id: string) {
        super(ErrorGameDoesNotExist.code, `Game does not exist: ${id}`);
    }
}

export class ErrorGameVersionDoesNotExist extends ServerError {
    public static code = -401;
    
    constructor(version: number) {
        super(ErrorGameVersionDoesNotExist.code, `Game version does not exist: ${version}`);
    }
}

export class ErrorUserNotPlayingInGame extends ServerError {
    public static code = -402;
    
    constructor(user: IUser, game: IGame) {
        super(ErrorUserNotPlayingInGame.code, `User ${user.getId()} does not play in game ${game.getId()}!`);
    }
}

export class ErrorInvalidGameOrder extends ServerError {
    public static code = -403;

    constructor(order: string) {
        super(ErrorInvalidGameOrder.code, `Invalid game order: ${order}`);
    }
}