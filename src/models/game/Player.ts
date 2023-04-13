import { Document, Schema } from 'mongoose';
import { Color } from '../../types/GameTypes';
import { IScore, ScoreSchema } from './Score';
import { IPlayedTile, PlayedTileSchema } from './PlayedTile';

export interface IPlayer extends Document {
    userId: string,
    color: Color,

    nTurnsPlayed: number,

    isPlaying: boolean,
    isCreator: boolean,
    isWinner: boolean,

    score: IScore,
    handTiles: number[],
    remainingTiles: number[],
    playedTiles: IPlayedTile[],

    // Methods
    stringify: () => string,
    getId: () => string,
}



export const PlayerSchema = new Schema<IPlayer>({
    userId: { type: String, required: true },
    color: { type: String, required: true, enum: Object.values(Color) },

    nTurnsPlayed: { type: Number, required: true, default: 0 },

    isPlaying: { type: Boolean, required: true },
    isCreator: { type: Boolean, required: true },
    isWinner: { type: Boolean, required: true, default: false },

    score: { type: ScoreSchema, required: true, default: {} },
    
    handTiles: { type: [Number], required: true },
    remainingTiles: { type: [Number], required: true },
    playedTiles: { type: [PlayedTileSchema], required: true },
});



PlayerSchema.methods.stringify = function() {
    return `[Game: ${this.parent().getId()}, User: ${this.userId}]`;
}

PlayerSchema.methods.getId = function() {
    return this._id;
}