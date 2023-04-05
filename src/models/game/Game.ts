import { Document, model, Model, Schema } from 'mongoose';

export interface IGame extends Document {
    name: string,
    version: number,
    creatorId: string,

    createTime: Date,
    startTime?: Date,
    endTime?: Date,
    lastViewedTime?: Date,
    lastPlayedTime?: Date,

    nTurnsPlayed: number,

    // Methods
    stringify: () => string,
    getId: () => string,
}



export interface IGameModel extends Model<IGame> {
    getById: (id: string) => Promise<IGame>,
}



export const GameSchema = new Schema<IGame>({
    name: { type: String, required: true },
    version: { type: Number, required: true, default: 0, min: 0 },
    creatorId: { type: String, required: true },
    
    createTime: { type: Date, required: true, default: () => new Date() },
    startTime: { type: Date },
    endTime: { type: Date },
    lastViewedTime: { type: Date },
    lastPlayedTime: { type: Date },

    nTurnsPlayed: { type: Number, required: true, min: 0, default: 0 },
});



GameSchema.methods.stringify = function() {
    return `${this.getId()}, ${this.name}, ${this.creatorId}, #${this.version}`;
}

GameSchema.methods.getId = function() {
    return this._id;
}



GameSchema.statics.getById = async function(id: string) {
    return this.findById(id).exec();
}



const GameModel = model<IGame, IGameModel>('Game', GameSchema);

export default GameModel;