class ClosedCity {
    private gameId: string;
    private boardTileId: string;

    public constructor(gameId: string, boardTileId: string) {
        this.gameId = gameId;
        this.boardTileId = boardTileId;
    }

    public toString() {
        return `[Game ${this.gameId}]: ${this.boardTileId}`;
    }
}

export default ClosedCity;