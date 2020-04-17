import CallPOST from './CallPOST';

export class CallPlayGame extends CallPOST {

    constructor(gameId: number, handTileId: number, boardTileFromId: number, boardTileToId: number, casteFrom: string, casteTo: string) {
        super(`game/${gameId}/play/`, {
            handTileId,
            boardTileFromId,
            boardTileToId,
            casteFrom,
            casteTo,
        });
    }
};