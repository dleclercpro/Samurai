import { Document, model, Model, Schema } from 'mongoose';
import { Color } from '../../types/GameTypes';

export interface IPlayer extends Document {
    gameId: string,
    userId: string,
    color: Color,

    nTurnsPlayed: number,

    // Methods
    stringify: () => string,
    getId: () => string,
}



export interface IPlayerModel extends Model<IPlayer> {
    getById: (id: string) => Promise<IPlayer>,
}



export const PlayerSchema = new Schema<IPlayer>({
    gameId: { type: String, required: true },
    userId: { type: String, required: true },
    color: { type: String, required: true, enum: Object.values(Color) },

    nTurnsPlayed: { type: Number, required: true, default: 0 },
});



PlayerSchema.methods.stringify = function() {
    return ``;
}

PlayerSchema.methods.getId = function() {
    return this._id;
}



PlayerSchema.statics.getById = async function(id: string) {
    return this.findById(id).exec();
}



const PlayerModel = model<IPlayer, IPlayerModel>('Player', PlayerSchema);

export default PlayerModel;