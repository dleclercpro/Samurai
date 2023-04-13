import { Document, model, Model, Schema } from 'mongoose';
import { IPlayer, PlayerSchema } from './Player';
import User, { IUser } from './User';
import { CitySchema, ICity } from './City';
import { isMongoError } from '../databases/base/MongoDB';
import { ErrorUserDoesNotExist } from '../errors/UserErrors';
import { ErrorGameDoesNotExist } from '../errors/GameErrors';

export interface IGame extends Document {
    name: string,
    version: number,

    createTime: Date,
    startTime?: Date,
    endTime?: Date,
    lastViewedTime?: Date,
    lastPlayedTime?: Date,

    players: IPlayer[],
    cities: ICity[],

    // Methods
    stringify: () => string,
    getId: () => string,
    getVersion: () => number,
    getCreator: () => Promise<IUser>,
}



export interface IGameModel extends Model<IGame> {
    getById: (id: string) => Promise<IGame>,
}



export const GameSchema = new Schema<IGame>({
    name: { type: String, required: true },
    version: { type: Number, required: true, default: 0, min: 0 },
    
    createTime: { type: Date, required: true, default: () => new Date() },
    startTime: { type: Date },
    endTime: { type: Date },
    lastViewedTime: { type: Date },
    lastPlayedTime: { type: Date },

    players: { type: [PlayerSchema], required: true, min: 2, max: 4 },
    cities: { type: [CitySchema], required: true },
});



GameSchema.methods.stringify = function() {
    return `${this.getId()}, ${this.name}, ${this.creatorId}, #${this.version}`;
}

GameSchema.methods.getId = function() {
    return this._id;
}

GameSchema.methods.getVersion = function() {
    return this.version;
}

GameSchema.methods.getCreator = async function() {
    for (const player of this.players) {
        if (player.isCreator) {
            return User.getById(player.userId);
        }
    }
}



GameSchema.statics.getById = async function(id: string) {
    try {
        return await this.findById(id).exec();
    } catch (e: any) {
        throw new ErrorGameDoesNotExist(id);
    }
}



const Game = model<IGame, IGameModel>('Game', GameSchema);

export default Game;