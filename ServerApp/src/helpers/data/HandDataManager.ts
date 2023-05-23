import { FULL_HAND_JSON } from '../../config/GameConfig';
import { BOARD_TILE_SWAP_IDS } from '../../constants';
import { ErrorGameHandTileDoesNotExist } from '../../errors/GameErrors';
import { HandJSON, HandTileJSON } from '../../types/JSONTypes';

/*
    This class is responsible for handling constant details about
    hand tiles, based on a JSON file. It is a singleton.
*/
class HandDataManager {
    private static instance: HandDataManager;

    private tiles: Record<string, HandTileJSON>;

    private constructor(hand: HandJSON) {
        this.tiles = this.load(hand);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new HandDataManager(FULL_HAND_JSON);
        }

        return this.instance;
    }

    // PRIVATE METHODS
    private load(hand: HandJSON) {
        return hand.reduce((prevTiles, tile) => ({
            ...prevTiles,
            [tile.id]: tile,
        }), {});
    }

    // PUBLIC METHODS
    public getTiles() {
        return Object.values(this.tiles);
    }

    public getSwapTiles() {
        return BOARD_TILE_SWAP_IDS.map(id => this.getTileById(id));
    }

    public getTileById(id: number) {
        const tile = this.getTiles().find(tile => tile.id === id);

        if (!tile) {
            throw new ErrorGameHandTileDoesNotExist(id);
        }

        return tile;
    }

    public getTileTypeById(id: number) {
        return this.getTileById(id).type;
    }

    public getTileStrengthById(id: number) {
        return this.getTileById(id).strength;
    }

    public getTileReplayById(id: number) {
        return this.getTileById(id).replay;
    }
}

export default HandDataManager.getInstance();