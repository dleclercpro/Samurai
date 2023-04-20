import { Types, Schema, Model, model } from 'mongoose';
import { Caste } from '../types/GameTypes';
import BoardData from '../helpers/data/BoardDataManager';
import { SCHEMA_WITHOUT_ID } from '../constants';

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
    playedTile?: number,

    // Methods
    stringify: () => string,
    getId: () => string,
    getType: () => BoardTileType,
    getCastes: () => Caste[],
    hasCaste: (caste: Caste) => boolean,
    playTile: () => void,
    isPlayed: () => boolean,
}



export interface IBoardTileModel extends Model<IBoardTile> {

}



export const BoardTileSchema = new Schema<IBoardTile>({
    id: { type: Number, required: true },
    castes: { type: [String], enum: Object.values(Caste), required: true, default: [] },
    playedTile: { type: Number },

}, SCHEMA_WITHOUT_ID);



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

BoardTileSchema.methods.hasCaste = function(caste: Caste) {
    return this.castes.includes(caste);
}

BoardTileSchema.methods.playTile = function(handTileId: number) {
    this.playedTile = handTileId;
}

BoardTileSchema.methods.isPlayed = function() {
    return !!this.playedTile;
}



const BoardTile = model<IBoardTile, IBoardTileModel>('BoardTile', BoardTileSchema);

export default BoardTile;