class Winner {
    private playerId: string;

    public constructor(playerId: string) {
        this.playerId = playerId;
    }

    public toString() {
        return this.playerId;
    }
}

export default Winner;