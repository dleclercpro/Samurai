import { Document, Schema } from 'mongoose';
import { Color } from '../../types/GameTypes';

export interface IPlayer extends Document {
    userId: string,
    color: Color,
    isCreator: boolean,
    nTurnsPlayed: number,

    // Methods
    stringify: () => string,
    getId: () => string,
}



export const PlayerSchema = new Schema<IPlayer>({
    userId: { type: String, required: true },
    color: { type: String, required: true, enum: Object.values(Color) },
    isCreator: { type: Boolean, required: true },
    nTurnsPlayed: { type: Number, required: true, default: 0 },
});



PlayerSchema.methods.stringify = function() {
    return ``;
}

PlayerSchema.methods.getId = function() {
    return this._id;
}