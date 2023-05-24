import Board from '../../models/Board';
import BoardTile, { IBoardTile } from '../../models/BoardTile';
import { BoardTileJSON } from '../../types/JSONTypes';
import BoardDataManager from '../data/BoardDataManager';
import TestBoardData from '../data/TestBoardDataManager';
import BoardBuilder from './BoardBuilder';

class TestBoardBuilder extends BoardBuilder {

    public build() {
        const TestBoardDataManager = new TestBoardData(this.nPlayers);
        const excludedSections = this.getExcludedSections();

        // Start building board with playable tiles contained in existing sections
        const playableTiles = BoardDataManager.getTiles()
            .filter(tile => !excludedSections.includes(tile.section))
            .reduce((prevTiles: IBoardTile[], tile: BoardTileJSON) => {
                const castePieces = TestBoardDataManager.getTileById(tile.id).castes;

                return [
                    ...prevTiles,
                    new BoardTile({
                        id: tile.id,
                        castePieces,
                        remainingCastePieces: castePieces,
                    }),
                ];
            }, []);

        // Finish off by adding caste swapping tiles, also based on number of players
        const tiles = BoardDataManager.getSwapTiles()
            .slice(0, this.nPlayers)
            .reduce((prevTiles, tile) => {
                return [
                    ...prevTiles,
                    new BoardTile({
                        id: tile.id,
                    }),
                ];
            }, playableTiles);

        return new Board({ tiles });
    }
}

export default TestBoardBuilder;