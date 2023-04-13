import { Document, Schema } from 'mongoose';
import { Caste } from '../types/GameTypes';

export interface IScore extends Document {
    [Caste.Military]: number,
    [Caste.Commerce]: number,
    [Caste.Religion]: number,

    // Methods
    stringify: () => string,
}



export const ScoreSchema = new Schema<IScore>({
    [Caste.Military]: { type: Number, required: true, default: 0, min: 0 },
    [Caste.Commerce]: { type: Number, required: true, default: 0, min: 0 },
    [Caste.Religion]: { type: Number, required: true, default: 0, min: 0 },
});



ScoreSchema.methods.stringify = function() {
    const string = Object.entries(Caste)
        .map(([key, value]: [string, Caste]) => `${value}: ${this[key]}`)
        .join(', ');

    return `[${string}]`;
}