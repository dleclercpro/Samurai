class CurrentPlayer {
    private id: string;

    public constructor(id: string) {
        this.id = id;
    }

    public getId() {
        return this.id;
    }
}

export default CurrentPlayer;