import { Model, Schema, Types, model } from 'mongoose';
import { Color } from '../types/GameTypes';
import { IScore, ScoreSchema } from './Score';
import { HandSchema, IHand } from './Hand';
import { IPlayedTile, PlayedTileSchema } from './PlayedTile';

export interface IPlayer extends Types.Subdocument {
    userId: string,
    color: Color,

    nTurnsPlayed: number,

    isPlaying: boolean,
    isCreator: boolean,
    isWinner: boolean,

    score: IScore,
    hand: IHand,
    remainingTiles: number[],
    playedTiles: IPlayedTile[],

    // Methods
    stringify: () => string,
    getId: () => string,
    getHand: () => IHand,
}



export interface IPlayerModel extends Model<IPlayer> {

}



export const PlayerSchema = new Schema<IPlayer>({
    userId: { type: String, required: true },
    color: { type: String, required: true, enum: Object.values(Color) },

    nTurnsPlayed: { type: Number, required: true, default: 0 },

    isPlaying: { type: Boolean, required: true },
    isCreator: { type: Boolean, required: true },
    isWinner: { type: Boolean, required: true, default: false },

    score: { type: ScoreSchema, required: true, default: {} },
    
    hand: { type: HandSchema, required: true },
    remainingTiles: { type: [Number], required: true },
    playedTiles: { type: [PlayedTileSchema], required: true, default: [] },
});



// METHODS
PlayerSchema.methods.stringify = function() {
    return `[Game: ${this.parent().getId()}, User: ${this.userId}]`;
}

PlayerSchema.methods.getId = function() {
    return this._id;
}

PlayerSchema.methods.getHand = function() {
    return this.hand;
}



const Player = model<IPlayer, IPlayerModel>('Player', PlayerSchema);

export default Player;