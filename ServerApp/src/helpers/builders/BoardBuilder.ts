import { getRange } from '../../libs/math';
import Board, { BoardSection } from '../../models/Board';
import BoardTile, { IBoardTile } from '../../models/BoardTile';
import { BoardTileJSON } from '../../types/JSONTypes';
import BoardDataManager from '../data/BoardDataManager';
import CastePiecesBag from '../CastePiecesBag';
import { ErrorGameInvalidPlayerCount } from '../../errors/GameErrors';

class BoardBuilder {
    protected nPlayers: number;

    public constructor(nPlayers: number) {
        this.nPlayers = nPlayers;
    }
    
    // Based on number of players, some sections of the full board are
    // left off
    protected getExcludedSections() {
        let excludedSections = [BoardSection.SwapTiles];

        switch (this.nPlayers) {
            case 2:
                excludedSections.push(BoardSection.North, BoardSection.South);
                break;
            case 3:
                excludedSections.push(BoardSection.North);
                break;
            case 4:
                break;
            default:
                throw new ErrorGameInvalidPlayerCount(this.nPlayers);
        }

        return excludedSections;
    }

    public build() {
        const excludedSections = this.getExcludedSections();

        // Generate new bag of caste pieces with random picking (size
        // is based on number of players)
        const castePiecesBag = new CastePiecesBag(this.nPlayers);

        // Start building board with playable tiles contained in existing sections
        const playableTiles = BoardDataManager.getTiles()
            .filter(tile => !excludedSections.includes(tile.section))
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

export default BoardBuilder;