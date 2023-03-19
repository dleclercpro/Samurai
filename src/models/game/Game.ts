import { database } from '../..';
import User from '../User';

class Game {
    private id: string;
    private name: string;
    private version: number;
    private creator: User;
    private opponents: User[];
    private createTime: Date;
    private startTime?: Date;
    private endTime?: Date;

    public constructor(id: string, name: string, creator: User, opponents: User[], createTime: Date, startTime?: Date, endTime?: Date, version: number = 0) {
        this.id = id;
        this.name = name;
        this.version = version;
        this.creator = creator;
        this.opponents = opponents;
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

    public getCreator() {
        return this.creator;
    }

    public getOpponents() {
        return this.opponents;
    }

    public toString() {
        return `${this.id}, ${this.name}, ${this.creator}, #${this.version}`;
    }

    // STATIC METHODS
    public static async create(name: string, creator: User, opponents: User[]) {

        // Generate new ID
        const id = String(database.getGameCount() + 1);

        // Create new game
        const game = new Game(id, name, creator, opponents, new Date());

        // Store user in database
        database.setGame(game);

        return game;
    }
}

export default Game;