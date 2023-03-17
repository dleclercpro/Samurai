class Score {
    private playerId: string;
    private military: number;
    private religion: number;
    private commerce: number;

    public constructor(playerId: string, military: number, religion: number, commerce: number) {
        this.playerId = playerId;
        this.military = military;
        this.religion = religion;
        this.commerce = commerce;
    }

    public toString() {
        return `[Player ${this.playerId}]: (Military: ${this.military}, Religion: ${this.religion}, Commerce: ${this.commerce})`;
    }
}

export default Score;