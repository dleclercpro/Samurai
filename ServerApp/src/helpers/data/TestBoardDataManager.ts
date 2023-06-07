import { TEST_BOARD_2_PLAYERS_JSON, TEST_BOARD_3_PLAYERS_JSON, TEST_BOARD_4_PLAYERS_JSON } from '../../config/TestConfig';
import { ErrorGameBoardTileDoesNotExist, ErrorGameInvalidPlayerCount } from '../../errors/GameErrors';
import { TestBoardJSON, TestBoardTileJSON } from '../../types/JSONTypes';

type TileMap = Record<string, TestBoardTileJSON>;

class TestBoardDataManager {
    private tiles: TileMap;

    public constructor(nPlayers: number) {
        switch (nPlayers) {
            case 2:
                this.tiles = this.loadTilesFromJSON(TEST_BOARD_2_PLAYERS_JSON);
                break;
            case 3:
                this.tiles = this.loadTilesFromJSON(TEST_BOARD_3_PLAYERS_JSON);
                break;
            case 4:
                this.tiles = this.loadTilesFromJSON(TEST_BOARD_4_PLAYERS_JSON);
                break;
            default:
                throw new ErrorGameInvalidPlayerCount(nPlayers);
        }
    }

    // PRIVATE METHODS
    private loadTilesFromJSON(board: TestBoardJSON) {
        return board.reduce((prevTiles, tile) => ({
            ...prevTiles,
            [tile.id]: tile,
        }), {} as TileMap);
    }

    // PUBLIC METHODS
    public getTiles() {
        return Object.values(this.tiles);
    }

    public getTileById(id: number) {
        const tile = this.getTiles().find(tile => tile.id === id);

        if (!tile) {
            throw new ErrorGameBoardTileDoesNotExist(id);
        }

        return tile;
    }
}

export default TestBoardDataManager;