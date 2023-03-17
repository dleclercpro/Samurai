class HandTile {
    private tileId: string;
    private playerId: string;

    public constructor(tileId: string, playerId: string) {
        this.tileId = tileId;
        this.playerId = playerId;
    }

    public getTileId() {
        return this.tileId;
    }

    public toString() {
        return `[Player ${this.playerId}]: ${this.tileId}`;
    }
}

export default HandTile;