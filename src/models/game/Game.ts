import { Document, model, Model, Schema } from 'mongoose';
import { IPlayer, PlayerSchema } from './Player';
import UserModel, { IUser } from '../auth/User';

export interface IGame extends Document {
    name: string,
    version: number,

    createTime: Date,
    startTime?: Date,
    endTime?: Date,
    lastViewedTime?: Date,
    lastPlayedTime?: Date,

    players: IPlayer[],

    // Methods
    stringify: () => string,
    getId: () => string,
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

    players: { type: [PlayerSchema], required: true, min: 2, max: 4 }
});



GameSchema.methods.stringify = function() {
    return `${this.getId()}, ${this.name}, ${this.creatorId}, #${this.version}`;
}

GameSchema.methods.getId = function() {
    return this._id;
}

GameSchema.methods.getCreator = async function() {
    for (const player of this.players) {
        if (player.isCreator) {
            return UserModel.getById(player.userId);
        }
    }
}



GameSchema.statics.getById = async function(id: string) {
    return this.findById(id).exec();
}



const GameModel = model<IGame, IGameModel>('Game', GameSchema);

export default GameModel;