import { Caste } from '../../types/GameTypes';

class CastePiece {
    private caste: Caste;
    private gameId: string;
    private boardTileId: string;

    public constructor(caste: Caste, gameId: string, boardTileId: string) {
        this.caste = caste;
        this.gameId = gameId;
        this.boardTileId = boardTileId;
    }

    public toString() {
        return `[Game ${this.gameId}]: (${this.caste}, ${this.boardTileId})`;
    }
}

export default CastePiece;