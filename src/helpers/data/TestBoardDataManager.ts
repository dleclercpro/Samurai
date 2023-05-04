import { TEST_BOARD_2_PLAYERS_JSON, TEST_BOARD_3_PLAYERS_JSON, TEST_BOARD_4_PLAYERS_JSON } from '../../config/TestConfig';
import { TestBoardJSON, TestBoardTileJSON } from '../../types/JSONTypes';

class TestBoardDataManager {
    private tiles: Record<string, TestBoardTileJSON>;

    public constructor(nPlayers: number) {
        switch (nPlayers) {
            case 2:
                this.tiles = this.load(TEST_BOARD_2_PLAYERS_JSON);
                break;
            case 3:
                this.tiles = this.load(TEST_BOARD_3_PLAYERS_JSON);
                break;
            case 4:
                this.tiles = this.load(TEST_BOARD_4_PLAYERS_JSON);
                break;
            default:
                throw new Error('Invalid number of players!');
        }
    }

    // PRIVATE METHODS
    private load(board: TestBoardJSON) {
        return board.reduce((prevTiles, tile) => ({
            ...prevTiles,
            [tile.id]: tile,
        }), {});
    }

    // PUBLIC METHODS
    public getTiles() {
        return Object.values(this.tiles);
    }

    public getTileById(id: number) {
        const tile = this.getTiles().find(tile => tile.id === id);

        if (!tile) {
            throw new Error('This board tile does not exist!');
        }

        return tile;
    }
}

export default TestBoardDataManager;