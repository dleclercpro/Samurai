import { BOARD_JSON } from '../../config/GameConfig';
import { BOARD_TILE_SWAP_IDS } from '../../constants';
import { ErrorGameBoardTileDoesNotExist } from '../../errors/GameErrors';
import { BoardJSON, BoardTileJSON } from '../../types/JSONTypes';

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
        return BOARD_TILE_SWAP_IDS.map(id => this.getTileById(id));
    }

    public getCities() {
        return this.getTiles().filter(tile => tile.castes > 0);
    }

    public getTileById(id: number) {
        const tile = this.getTiles().find(tile => tile.id === id);

        if (!tile) {
            throw new ErrorGameBoardTileDoesNotExist(id);
        }

        return tile;
    }

    public getTileTypeById(id: number) {
        return this.getTileById(id).type;
    }

    public getTileSectionsById(id: number) {
        return this.getTileById(id).sections;
    }

    public getTileCoordinatesById(id: number) {
        return this.getTileById(id).coordinates;
    }

    public getTileNeighborsById(id: number) {
        return this.getTileById(id).neighbors.map(tileId => this.getTileById(tileId));
    }
}

export default BoardDataManager.getInstance();