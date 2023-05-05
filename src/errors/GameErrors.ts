import { GameOrderType } from '../commands/game/PlayGameCommand';
import { IBoardTile } from '../models/BoardTile';
import { IGame } from '../models/Game';
import { IHand } from '../models/Hand';
import { IUser } from '../models/User';
import { Caste } from '../types/GameTypes';
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

export class ErrorGameInvalidOrder extends ServerError {
    public static code = -403;

    constructor(order: GameOrderType) {
        super(ErrorGameInvalidOrder.code, `Invalid game order: ${order}`);
    }
}

export class ErrorGameAlreadyOver extends ServerError {
    public static code = -404;
    
    constructor(game: IGame) {
        super(ErrorGameAlreadyOver.code, `Game is already over: ${game.getId()}`);
    }
}

export class ErrorGameDuplicateUsers extends ServerError {
    public static code = -405;
    
    constructor() {
        super(ErrorGameDuplicateUsers.code, `Game cannot be created with duplicate users.`);
    }
}

export class ErrorGameTileNotInHand extends ServerError {
    public static code = -406;

    constructor(id: number, hand: IHand) {
        super(ErrorGameTileNotInHand.code, `Tile with ID ${id} is not in player's hand: [${hand.stringify()}]`);
    }
}

export class ErrorGameMissingCastePiece extends ServerError {
    public static code = -407;

    constructor(caste: Caste, boardTile: IBoardTile) {
        super(ErrorGameMissingCastePiece.code, `Given caste piece '${caste}' is missing on board tile with ID '${boardTile.getId()}'.`);
    }
}

export class ErrorGameCannotSwapCastePiecesOnSameBoardTile extends ServerError {
    public static code = -408;

    constructor() {
        super(ErrorGameCannotSwapCastePiecesOnSameBoardTile.code, `Cannot swap caste pieces from/to the same board tile.`);
    }
}

export class ErrorGameBoardTileNotACity extends ServerError {
    public static code = -409;

    constructor(boardTile: IBoardTile) {
        super(ErrorGameBoardTileNotACity.code, `Board tile is not a city: ${boardTile.getId()}`);
    }
}