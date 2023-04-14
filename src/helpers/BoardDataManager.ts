import { BOARD_JSON } from '../config/GameConfig';
import { CASTE_SWAP_BOARD_TILE_IDS } from '../constants';
import { BoardJSON, BoardTileJSON } from '../types/JSONTypes';

/*
    This class is responsible for handling constant details about
    the board, based on a JSON file. It is a singleton.
*/
class BoardDataManager {
    private static instance: BoardDataManager;

    private tiles: Record<string, BoardTileJSON>;

    private constructor(board: BoardJSON) {
        this.tiles = this.load(board);
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new BoardDataManager(BOARD_JSON);
        }

        return this.instance;
    }

    // PRIVATE METHODS
    private load(board: BoardJSON) {
        return board.reduce((prevTiles, tile) => ({
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
            throw new Error('This board tile does not exist!');
        }

        return tile;
    }

    public getTileType(id: number) {
        return this.getTile(id).type;
    }

    public getTileNeighbors(id: number) {
        return this.getTile(id).neighbors.map(tileId => this.getTile(tileId));
    }
}

export default BoardDataManager.getInstance();