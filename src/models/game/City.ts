import { Document, Schema } from 'mongoose';
import { Caste } from '../../types/GameTypes';

export interface ICity extends Document {
    boardTileId: number,
    castePieces: Caste[],

    // Methods
    stringify: () => string,
}



export const CitySchema = new Schema<ICity>({
    boardTileId: { type: Number, required: true },
    castePieces: { type: [String], enum: Caste, required: true, min: 1, max: 3 },
});



CitySchema.methods.stringify = function() {
    return ``;
}