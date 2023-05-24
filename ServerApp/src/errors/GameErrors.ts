import { HAND_SIZE, PLAYER_COUNT_MAX, PLAYER_COUNT_MIN } from '../constants';
import { IBoardTile } from '../models/BoardTile';
import { IGame } from '../models/Game';
import { IHand } from '../models/Hand';
import { IHandTile } from '../models/HandTile';
import { OrderType } from '../models/Order';
import { IPlayer } from '../models/Player';
import { IUser } from '../models/User';
import { Caste } from '../types/GameTypes';
import { ServerError } from './ServerError';

export class ErrorGameDoesNotExist extends ServerError {
    public static code = -400;
    
    constructor(id: string) {
        super(ErrorGameDoesNotExist.code, `Game does not exist: ${id}.`);
    }
}

export class ErrorGameVersionDoesNotExist extends ServerError {
    public static code = -401;
    
    constructor(version: number) {
        super(ErrorGameVersionDoesNotExist.code, `Game version does not exist: ${version}.`);
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

    constructor(order: OrderType) {
        super(ErrorGameInvalidOrder.code, `Invalid game order: ${order}.`);
    }
}

export class ErrorGameAlreadyOver extends ServerError {
    public static code = -404;
    
    constructor(game: IGame) {
        super(ErrorGameAlreadyOver.code, `Game is already over: ${game.getId()}.`);
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
        super(ErrorGameTileNotInHand.code, `Tile with ID ${id} is not in player's hand: [${hand.stringify()}].`);
    }
}

export class ErrorGameMissingCastePiece extends ServerError {
    public static code = -407;

    constructor(caste: Caste, boardTile: IBoardTile) {
        super(ErrorGameMissingCastePiece.code, `Given caste piece '${caste}' is missing on board tile with ID '${boardTile.getId()}'.`);
    }
}

export class ErrorGameBoardTileNotFree extends ServerError {
    public static code = -408;

    constructor(boardTile: IBoardTile) {
        super(ErrorGameBoardTileNotFree.code, `Board tile is not free: ${boardTile.getId()}.`);
    }
}

export class ErrorGameBoardTileNotACity extends ServerError {
    public static code = -409;

    constructor(boardTile: IBoardTile) {
        super(ErrorGameBoardTileNotACity.code, `Board tile is not a city: ${boardTile.getId()}.`);
    }
}

export class ErrorGameIncompatibleTileTypes extends ServerError {
    public static code = -410;

    constructor(boardTile: IBoardTile, handTile: IHandTile) {
        super(ErrorGameIncompatibleTileTypes.code, `Board and hand tiles aren't compatible: ${boardTile.getType()} vs. ${handTile.getType()}.`);
    }
}

export class ErrorGameCannotPlaceTileOntoCity extends ServerError {
    public static code = -411;

    constructor(boardTile: IBoardTile, handTile: IHandTile) {
        super(ErrorGameCannotPlaceTileOntoCity.code, `Cannot place hand tile (ID = ${handTile.getId()}) onto city board tile (ID = ${boardTile.getId()}).`);
    }
}

export class ErrorGameBoardTileDoesNotExist extends ServerError {
    public static code = -412;

    constructor(id: number) {
        super(ErrorGameBoardTileDoesNotExist.code, `Board tile (ID = ${id}) does not exist.`);
    }
}

export class ErrorGameHandTileDoesNotExist extends ServerError {
    public static code = -413;

    constructor(id: number) {
        super(ErrorGameHandTileDoesNotExist.code, `Hand tile (ID = ${id}) does not exist.`);
    }
}

export class ErrorGameInvalidPlayerCount extends ServerError {
    public static code = -414;

    constructor(n: number) {
        super(ErrorGameInvalidPlayerCount.code, `Invalid number of players: ${n}. Min: ${PLAYER_COUNT_MIN}. Max: ${PLAYER_COUNT_MAX}.`);
    }
}

export class ErrorGameInvalidHandSize extends ServerError {
    public static code = -415;

    constructor(size: number) {
        super(ErrorGameInvalidHandSize.code, `Invalid hand size: ${size} (given) vs. ${HAND_SIZE} (valid).`);
    }
}

export class ErrorGameEmptyCastePiecesBag extends ServerError {
    public static code = -416;

    constructor() {
        super(ErrorGameEmptyCastePiecesBag.code, `Caste pieces bag is empty.`);
    }
}

export class ErrorGameCannotSwapCastePiecesOnSameBoardTile extends ServerError {
    public static code = -417;

    constructor() {
        super(ErrorGameCannotSwapCastePiecesOnSameBoardTile.code, `Cannot swap caste pieces from/to the same board tile.`);
    }
}

export class ErrorGameCannotSwapCastePiecesFromToNonCityBoardTile extends ServerError {
    public static code = -418;

    constructor(boardTile: IBoardTile) {
        super(ErrorGameCannotSwapCastePiecesFromToNonCityBoardTile.code, `Cannot swap caste pieces from/to non-city board tile (ID = ${boardTile.getId()}).`);
    }
}

export class ErrorGameNotEnoughPlayers extends ServerError {
    public static code = -419;

    constructor(nPlayers: number) {
        super(ErrorGameNotEnoughPlayers.code, `Not enough players: ${nPlayers} < ${PLAYER_COUNT_MIN}.`);
    }
}

export class ErrorGameTooManyPlayers extends ServerError {
    public static code = -420;

    constructor(nPlayers: number) {
        super(ErrorGameTooManyPlayers.code, `Too many players: ${nPlayers} > ${PLAYER_COUNT_MAX}.`);
    }
}

export class ErrorGameNotPlayerTurn extends ServerError {
    public static code = -421;

    constructor(player: IPlayer) {
        super(ErrorGameNotPlayerTurn.code, `Given player (ID = ${player.getId()}) has to wait its turn.`);
    }
}

export class ErrorGameCannotMoveOtherPlayerTile extends ServerError {
    public static code = -422;

    constructor(player: IPlayer, otherPlayer: IPlayer) {
        super(ErrorGameCannotMoveOtherPlayerTile.code, `Cannot move tile placed by other player: player (ID = ${player.getId()}) is trying to move tile placed by other player (ID = ${otherPlayer.getId()}).`);
    }
}