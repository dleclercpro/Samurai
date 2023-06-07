import Board from '../../models/Board';
import BoardTile, { IBoardTile } from '../../models/BoardTile';
import { BoardTileJSON } from '../../types/JSONTypes';
import DataManagers from '../data/DataManagers';
import BoardBuilder from './BoardBuilder';

class TestBoardBuilder extends BoardBuilder {

    public build() {
        const boardDataManager = DataManagers.getBoardDataManager(this.nPlayers);
        const testBoardDataManager = DataManagers.getTestBoardDataManager(this.nPlayers);

        // Start building board with playable tiles contained in existing sections
        const playableTiles = boardDataManager.getPlayableTiles()
            .reduce((prevTiles: IBoardTile[], tile: BoardTileJSON) => {
                const castePieces = testBoardDataManager.getTileById(tile.id).castes;

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
        const tiles = boardDataManager.getSwapTiles()
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