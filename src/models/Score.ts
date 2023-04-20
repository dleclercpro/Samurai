import { Model, Schema, Types, model } from 'mongoose';
import { Caste } from '../types/GameTypes';
import { SCHEMA_WITHOUT_ID } from '../constants';



export interface IScore extends Types.Subdocument {
    [Caste.Military]: number,
    [Caste.Commerce]: number,
    [Caste.Religion]: number,

    // Methods
    stringify: () => string,
}



export interface IScoreModel extends Model<IScore> {

}



export const ScoreSchema = new Schema<IScore>({
    [Caste.Military]: { type: Number, required: true, default: 0, min: 0 },
    [Caste.Commerce]: { type: Number, required: true, default: 0, min: 0 },
    [Caste.Religion]: { type: Number, required: true, default: 0, min: 0 },

}, SCHEMA_WITHOUT_ID);



// METHODS
ScoreSchema.methods.stringify = function() {
    const string = Object.entries(Caste)
        .map(([key, value]: [string, Caste]) => `${value}: ${this[key]}`)
        .join(', ');

    return `[${string}]`;
}



const Score = model<IScore, IScoreModel>('Score', ScoreSchema);

export default Score;