import { Model, Schema, Types, model } from 'mongoose';
import { Caste, HandTileType } from '../types/GameTypes';
import { CASTES, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import HandDataManager from '../helpers/data/HandDataManager';
import Score, { IScore } from './Score';



export interface IHandTile extends Types.Subdocument {
    id: number,

    // Methods
    stringify: () => string,
    getId: () => number,
    getType: () => HandTileType,
    getStrength: () => number,
    canReplay: () => boolean,
}



export interface IHandTileModel extends Model<IHandTile> {

}



export const HandTileSchema = new Schema<IHandTile>({
    id: { type: Number, required: true },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
HandTileSchema.methods.stringify = function() {
    return ``;
}

HandTileSchema.methods.getId = function() {
    return this.id;
}

HandTileSchema.methods.getType = function() {
    return HandDataManager.getTileTypeById(this.id);
}

HandTileSchema.methods.getStrength = function() {
    return HandDataManager.getTileStrengthById(this.id);
}

HandTileSchema.methods.canReplay = function() {
    return HandDataManager.getTileReplayById(this.id);
}



const HandTile = model<IHandTile, IHandTileModel>('HandTile', HandTileSchema);

export default HandTile;