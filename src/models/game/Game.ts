import { ErrorUserNotPlayingInGame } from '../../errors/GameErrors';
import { getRandom, shuffle } from '../../libs';
import { Color } from '../../types/GameTypes';
import { IUser } from '../User';
import Player from './Player';

interface Argument {
    id: string,
    name: string,
    version: number,
    creator: IUser,
    opponents: IUser[],
    createTime: Date,
    startTime?: Date,
    endTime?: Date,
    players: Player[],
    currentPlayer: Player,
}

class Game {
    private id: string;
    private name: string;
    private version: number;

    private creator: IUser;
    private opponents: IUser[];

    private createTime: Date;
    private startTime?: Date;
    private endTime?: Date;

    private players: Player[];
    private currentPlayer: Player;

    public constructor(argument: Argument) {
        const { id, name, version = 0, creator, opponents, createTime, startTime, endTime, players, currentPlayer } = argument;

        this.id = id;
        this.name = name;
        this.version = version;

        this.creator = creator;
        this.opponents = opponents;

        this.createTime = createTime;
        this.startTime = startTime;
        this.endTime = endTime;

        this.players = players;
        this.currentPlayer = currentPlayer;
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

    public getVersion() {
        return this.version;
    }

    public getPlayers() {
        return this.players;
    }

    public getCurrentPlayer() {
        return this.currentPlayer;
    }

    public setCurrentPlayer(currentPlayer: Player) {
        this.currentPlayer = currentPlayer;
    }

    public setCurrentPlayerByUser(user: IUser) {
        throw new ErrorUserNotPlayingInGame(user, this);
    }

    public toString() {
        return `${this.id}, ${this.name}, ${this.creator}, #${this.version}`;
    }

    // PRIVATE METHODS
    private createPlayers(users: IUser[]) {

        // Randomly assign colors to users
        const randomizedColors = shuffle(Object.keys(Color)) as Color[];

        //const players = randomizedColors.map((color: Color, i: number) => Player.create(this, users[i], color))
    }

    // STATIC METHODS
    public static async findById(id: string) {

    }

    public static async create(name: string, creator: IUser, opponents: IUser[]) {

        // Generate new ID
        const id = String(0 + 1);

        // Create players
        const players = [] as Player[];

        // First player is randomly picked
        const currentPlayer = getRandom(players);

        // First version of game is zero
        const version = 0;

        // Create new game
        const game = new Game({
            id,
            name,
            version,
            creator,
            opponents,
            createTime: new Date(),
            players,
            currentPlayer,
        });

        // Store user in database
        //AppDB.setGame(game);

        return game;
    }
}

export default Game;