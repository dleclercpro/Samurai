import User from './User';

class Game {
    private id: string;
    private name: string;
    private version: number;
    private creatorId: string;
    private createTime: Date;
    private startTime: Date;
    private endTime: Date;

    public constructor(id: string, name: string, version: number, creator: User, createTime: Date, startTime: Date, endTime: Date) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.creatorId = creator.getId();
        this.createTime = createTime;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public toString() {
        return `${this.id}, ${this.name}, ${this.creatorId}, #${this.version}`;
    }
}

export default Game;