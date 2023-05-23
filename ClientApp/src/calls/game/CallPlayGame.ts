import CallPOST from '../base/CallPOST';
import { API_URL } from '../../config';

export class CallPlayGame extends CallPOST {

    constructor(gameId: string, handTileId: number, boardTileFromId: number | null, boardTileToId: number | null, casteFrom: string | null, casteTo: string | null) {
        super('PlayGame', `${API_URL}/game/${gameId}`, {
            handTileId,
            boardTileIds: { from: boardTileFromId, to: boardTileToId },
            castes: { from: casteFrom, to: casteTo },
        });
    }
};