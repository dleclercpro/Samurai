import { Model, Schema, Types, model } from 'mongoose';
import { Caste } from '../types/GameTypes';
import { CASTES, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';

export interface IScore extends Types.Subdocument {
    [Caste.Military]: number,
    [Caste.Religion]: number,
    [Caste.Commerce]: number,

    // Methods
    stringify: () => string,
    getByCaste: (caste: Caste) => number,
    setByCaste: (caste: Caste, value: number) => void,
    add: (score: IScore) => IScore,
}



export interface IScoreModel extends Model<IScore> {

}



export const ScoreSchema = new Schema<IScore>({
    [Caste.Military]: { type: Number, required: true, default: 0, min: 0 },
    [Caste.Commerce]: { type: Number, required: true, default: 0, min: 0 },
    [Caste.Religion]: { type: Number, required: true, default: 0, min: 0 },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
ScoreSchema.methods.stringify = function() {
    const string = Object.entries(Caste)
        .map(([key, value]: [string, Caste]) => `${value}: ${this[key]}`)
        .join(', ');

    return `[${string}]`;
}

ScoreSchema.methods.getByCaste = function(caste: Caste) {
    return this[caste];
}

ScoreSchema.methods.setByCaste = function (caste: Caste, value: number) {
    this[caste] = value;
}

ScoreSchema.methods.add = function(other: IScore) {
    const score = new Score();

    CASTES.forEach(caste => {
        score.setByCaste(caste, this.getByCaste(caste) + other.getByCaste(caste));
    });

    return score;
}



const Score = model<IScore, IScoreModel>('Score', ScoreSchema);

export default Score;