import Board from '../../models/Board';
import BoardTile, { IBoardTile } from '../../models/BoardTile';
import { BoardTileJSON } from '../../types/JSONTypes';
import BoardDataManager from '../data/BoardDataManager';
import TestBoardData from '../data/TestBoardDataManager';
import BoardBuilder from './BoardBuilder';

class TestBoardBuilder extends BoardBuilder {

    public build() {
        const TEST_BOARD_DATA = new TestBoardData(this.nPlayers);
        const excludedSections = this.getExcludedSections();

        // Start building board with playable tiles contained in existing sections
        const playableTiles = BoardDataManager.getTiles()
            .filter(tile => !excludedSections.includes(tile.section))
            .reduce((prevTiles: IBoardTile[], tile: BoardTileJSON) => {
                return [
                    ...prevTiles,
                    new BoardTile({
                        id: tile.id,
                        castes: TEST_BOARD_DATA.getTileById(tile.id).castes,
                    }),
                ];
            }, []);

        // Finish off by adding caste swapping tiles, also based on number of players
        const tiles = BoardDataManager.getSwapTiles()
            .slice(0, this.nPlayers)
            .reduce((prevTiles, tile) => {
                return [
                    ...prevTiles,
                    new BoardTile({ id: tile.id }),
                ];
            }, playableTiles);

        return new Board({ tiles });
    }
}

export default TestBoardBuilder;