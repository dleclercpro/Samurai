import CallPOST from '../base/CallPOST';

export class CallPlayGame extends CallPOST {

    constructor(gameId: string, handTileId: number, boardTileFromId: number, boardTileToId: number, casteFrom: string, casteTo: string) {
        super('PlayGame', `/game/${gameId}`, {
            handTileId,
            boardTileIds: { from: boardTileFromId, to: boardTileToId },
            castes: { from: casteFrom, to: casteTo },
        });
    }
};