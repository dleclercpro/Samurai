import { Model, Schema, Types, model } from 'mongoose';
import { Caste, Color } from '../types/GameTypes';
import { IScore, ScoreSchema } from './Score';
import { HandSchema, IHand } from './Hand';
import { COLORS, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IGame } from './Game';

export interface IPlayer extends Types.Subdocument {
    userId: string,
    color: Color,

    nTurnsPlayed: number,
    lastTurn: number, // Game version

    isPlaying: boolean,
    isCreator: boolean,
    isWinner: boolean,

    score: IScore,
    hand: IHand,

    // Methods
    stringify: () => string,
    getId: () => string,
    getUserId: () => string,
    getColor: () => Color,
    getHand: () => IHand,
    getScore: () => IScore,
    getLastTurn: () => number,
    setLastTurn: (version: number) => void,
    getPlayedTurnCount: () => number,
    incrementPlayedTurnCount: () => void,
    getIsPlaying: () => boolean,
    setIsPlaying: (isPlaying: boolean) => void,
    wasLastPlayer: () => boolean,
    hasWon: () => boolean,
    increaseScoreByCaste: (caste: Caste, points: number) => void,
}



export interface IPlayerModel extends Model<IPlayer> {

}



export const PlayerSchema = new Schema<IPlayer>({
    userId: { type: String, required: true },
    color: { type: String, required: true, enum: COLORS },

    nTurnsPlayed: { type: Number, required: true, default: 0 },
    lastTurn: { type: Number },

    isPlaying: { type: Boolean, required: true },
    isCreator: { type: Boolean, required: true },
    isWinner: { type: Boolean, required: true, default: false },

    score: { type: ScoreSchema, required: true, default: {} },
    hand: { type: HandSchema, required: true },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
PlayerSchema.methods.stringify = function() {
    return `[Game: ${this.parent().getId()}, User: ${this.userId}]`;
}

PlayerSchema.methods.getId = function() {
    return this._id.toString();
}

PlayerSchema.methods.getUserId = function() {
    return this.userId;
}

PlayerSchema.methods.getColor = function() {
    return this.color;
}

PlayerSchema.methods.getHand = function() {
    return this.hand;
}

PlayerSchema.methods.getScore = function() {
    return this.score;
}

PlayerSchema.methods.getLastTurn = function() {
    return this.lastTurn;
}

PlayerSchema.methods.setLastTurn = function(version: number) {
    this.lastTurn = version;
}

PlayerSchema.methods.getPlayedTurnCount = function() {
    return this.nTurnsPlayed;
}

PlayerSchema.methods.incrementPlayedTurnCount = function() {
    this.nTurnsPlayed += 1;
}

PlayerSchema.methods.getIsPlaying = function() {
    return this.isPlaying;
}

PlayerSchema.methods.setIsPlaying = function(isPlaying: boolean) {
    this.isPlaying = isPlaying;
}

PlayerSchema.methods.wasLastPlayer = function() {
    const game = (this as IPlayer).ownerDocument() as IGame;

    return game.getLastPlayer().getId() === (this as IPlayer).id;
}

PlayerSchema.methods.hasWon = function() {
    return this.isWinner;
}

PlayerSchema.methods.increaseScoreByCaste = function(caste: Caste, points: number) {
    return this.score.setByCaste(caste, this.score.getByCaste(caste) + points)
}



const Player = model<IPlayer, IPlayerModel>('Player', PlayerSchema);

export default Player;