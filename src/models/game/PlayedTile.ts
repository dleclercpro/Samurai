class PlayedTile {
    private handTileId: string;
    private boardTileId: string;
    private playerId: string;

    public constructor(handTileId: string, boardTileId: string, playerId: string) {
        this.handTileId = handTileId;
        this.boardTileId = boardTileId;
        this.playerId = playerId;
    }

    public toString() {
        return `[Player ${this.playerId}]: (${this.boardTileId}, ${this.handTileId})`;
    }
}

export default PlayedTile;