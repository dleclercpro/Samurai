import { HAND_JSON } from '../../config/GameConfig';
import { CASTE_SWAP_BOARD_TILE_IDS } from '../../constants';
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
            this.instance = new HandDataManager(HAND_JSON);
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
        return CASTE_SWAP_BOARD_TILE_IDS.map(id => this.getTile(id));
    }

    public getTile(id: number) {
        const tile = this.getTiles().find(tile => tile.id === id);

        if (!tile) {
            throw new Error('This hand tile does not exist!');
        }

        return tile;
    }

    public getTileType(id: number) {
        return this.getTile(id).type;
    }

    public getTileStrength(id: number) {
        return this.getTile(id).strength;
    }

    public canReplay(id: number) {
        return this.getTile(id).canReplay;
    }
}

export default HandDataManager.getInstance();