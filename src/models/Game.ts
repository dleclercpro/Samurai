import { Document, model, Model, Schema } from 'mongoose';
import { IPlayer, PlayerSchema } from './Player';
import User, { IUser } from './User';
import { ErrorGameDoesNotExist, ErrorUserNotPlayingInGame } from '../errors/GameErrors';
import { BoardSchema, IBoard } from './Board';
import { GAME_INIT_VERSION, GAME_PLAYER_COUNT_MAX, GAME_PLAYER_COUNT_MIN } from '../constants';
import { Scoreboard } from '../helpers/Scorer';

export interface IGame extends Document {
    name: string,
    version: number,

    createTime: Date,
    startTime?: Date,
    endTime?: Date,
    lastViewedTime?: Date,
    lastPlayedTime?: Date,

    board: IBoard,
    players: IPlayer[],

    // Methods
    stringify: () => string,
    getId: () => string,
    getVersion: () => number,
    setVersion: (version: number) => void,
    getCreator: () => Promise<IUser>,
    getBoard: () => IBoard,
    getPlayers: () => IPlayer[],
    getPlayerByUser: (user: IUser) => IPlayer,
    getScoreboard: () => Scoreboard,
    isOver: () => boolean,
    hasWinners: () => boolean,
    getWinners: () => IPlayer[],
    setWinners: (player: IPlayer[]) => void,

    getStartTime: () => Date,
    setStartTime: (time: Date) => void,
    getEndTime: () => Date,
    setEndTime: (time: Date) => void,
    getLastPlayedTime: () => Date,
    setLastPlayedTime: (time: Date) => void,
}



export interface IGameModel extends Model<IGame> {
    getById: (id: string) => Promise<IGame>,
}



export const GameSchema = new Schema<IGame>({
    name: { type: String, required: true },
    version: { type: Number, required: true, default: GAME_INIT_VERSION, min: GAME_INIT_VERSION },
    
    createTime: { type: Date, required: true, default: () => new Date() },
    startTime: { type: Date },
    endTime: { type: Date },
    lastViewedTime: { type: Date },
    lastPlayedTime: { type: Date },

    board: { type: BoardSchema, required: true },
    players: { type: [PlayerSchema], required: true, min: GAME_PLAYER_COUNT_MIN, max: GAME_PLAYER_COUNT_MAX },
});



// METHODS
GameSchema.methods.stringify = function() {
    return `${this.getId()}, ${this.name}, ${this.creatorId}, #${this.version}`;
}

GameSchema.methods.getId = function() {
    return this._id;
}

GameSchema.methods.getVersion = function() {
    return this.version;
}

GameSchema.methods.setVersion = function(version: number) {
    this.version = version;
}

GameSchema.methods.getCreator = async function() {
    for (const player of this.players) {
        if (player.isCreator) {
            return User.getById(player.userId);
        }
    }
}

GameSchema.methods.getBoard = function() {
    return this.board;
}

GameSchema.methods.getPlayerByUser = function(user: IUser) {
    const player = (this as IGame).players.find(player => player.userId === user.getId());

    if (!player) {
        throw new ErrorUserNotPlayingInGame(user, this as IGame);
    }

    return player;
}

GameSchema.methods.getScoreboard = function() {
    return this.players.reduce((scoreboard: Scoreboard, player: IPlayer) => {
        return {
            ...scoreboard,
            [player.getId()]: player.getScore(),
        };

    }, {} as Scoreboard);
}

GameSchema.methods.hasWinners = function() {
    return (this as IGame).getWinners().length > 0;
}

GameSchema.methods.getWinners = function() {
    return (this as IGame).getPlayers().filter(player => player.isWinner);
}

GameSchema.methods.setWinners = function(players: IPlayer[]) {
    players.forEach(player => {
        player.isWinner = true;
    });
}

GameSchema.methods.getStartTime = function() {
    return this.startTime;
}

GameSchema.methods.setStarTime = function(time: Date) {
    this.startTime = time;
}

GameSchema.methods.getEndTime = function() {
    return this.endTime;
}

GameSchema.methods.setEndTime = function(time: Date) {
    this.endTime = time;
}

GameSchema.methods.getLastPlayedTime = function() {
    return this.lastPlayedTime;
}

GameSchema.methods.setLastPlayedTime = function(time: Date) {
    this.lastPlayedTime = time;
}



// STATIC METHODS
GameSchema.statics.getById = async function(id: string) {
    try {
        return await this.findById(id).exec();
    } catch (e: any) {
        throw new ErrorGameDoesNotExist(id);
    }
}



const Game = model<IGame, IGameModel>('Game', GameSchema);

export default Game;