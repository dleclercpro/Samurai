import { getRange } from '../../utils/math';
import Board from '../../models/Board';
import BoardTile, { IBoardTile } from '../../models/BoardTile';
import { BoardTileJSON } from '../../types/JSONTypes';
import CastePiecesBag from '../CastePiecesBag';
import DataManagers from '../data/DataManagers';

class BoardBuilder {
    protected nPlayers: number;

    public constructor(nPlayers: number) {
        this.nPlayers = nPlayers;
    }
    
    public build() {
        const boardDataManager = DataManagers.getBoardDataManager(this.nPlayers);

        // Generate new bag of caste pieces with random picking (size
        // is based on number of players)
        const castePiecesBag = new CastePiecesBag(this.nPlayers);

        // Start building board with playable tiles contained in existing sections
        const playableTiles = boardDataManager.getPlayableTiles()
            .reduce((prevTiles: IBoardTile[], tile: BoardTileJSON) => {
                const castePieces = getRange(tile.castes).map(() => castePiecesBag.getNext());

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

export default BoardBuilder;