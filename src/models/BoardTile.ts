import { Types, Schema, Model, model } from 'mongoose';
import { Caste, HandTileType } from '../types/GameTypes';
import BoardData from '../helpers/data/BoardDataManager';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IPlayedTile, PlayedTileSchema } from './PlayedTile';
import { IHandTile } from './HandTile';

export interface BoardTileCoordinates {
    x: number,
    y: number,
}

export enum BoardTileType {
    Ground = 'Ground',
    Water = 'Water',
    Swap = 'Swap',
}



export interface IBoardTile extends Types.Subdocument {
    id: number,
    castes: Caste[],
    playedTile?: IPlayedTile,

    // Methods
    stringify: () => string,
    getId: () => string,
    getType: () => BoardTileType,
    getCastes: () => Caste[],
    getPlayedTile: () => IPlayedTile,
    hasCaste: (caste: Caste) => boolean,
    playTile: () => void,
    isFree: () => boolean,
    isCity: () => boolean,
    isHandTileCompatible: (handTile: IHandTile) => boolean,
}



export interface IBoardTileModel extends Model<IBoardTile> {

}



export const BoardTileSchema = new Schema<IBoardTile>({
    id: { type: Number, required: true },
    castes: { type: [String], enum: Object.values(Caste), required: true, default: [] },
    playedTile: { type: PlayedTileSchema },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
BoardTileSchema.methods.stringify = function() {
    return ``;
}

BoardTileSchema.methods.getId = function() {
    return this.id;
}

BoardTileSchema.methods.getType = function() {
    return BoardData.getTileType(this.id);
}

BoardTileSchema.methods.getCastes = function() {
    return this.castes;
}

BoardTileSchema.methods.getPlayedTile = function() {
    return this.playedTile;
}

BoardTileSchema.methods.hasCaste = function(caste: Caste) {
    return this.castes.includes(caste);
}

BoardTileSchema.methods.playTile = function(playedTile: IPlayedTile) {
    this.playedTile = playedTile;
}

BoardTileSchema.methods.isFree = function() {
    return !this.playedTile;
}

BoardTileSchema.methods.isCity = function() {
    return this.castes.length > 0;
}

BoardTileSchema.methods.isHandTileCompatible = function(handTile: IHandTile) {
    switch (this.type) {
        case BoardTileType.Ground:
            return [HandTileType.Military, HandTileType.Religion, HandTileType.Commerce, HandTileType.Samurai, HandTileType.Move].includes(handTile.getType());
        case BoardTileType.Water:
            return handTile.getType() === HandTileType.Ship;
        case BoardTileType.Swap:
            return handTile.getType() === HandTileType.Swap;
        default:
            throw new Error(`Unknown board tile: ${this.type}`);
    }
}



const BoardTile = model<IBoardTile, IBoardTileModel>('BoardTile', BoardTileSchema);

export default BoardTile;