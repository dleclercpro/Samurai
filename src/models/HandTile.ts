import { Model, Schema, Types, model } from 'mongoose';
import { HandTileType } from '../types/GameTypes';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';



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

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
HandTileSchema.methods.stringify = function() {
    return `[${this.parent().getId()}]: (${this.boardTileId}, ${this.handTileId})`;
}

HandTileSchema.methods.getId = function() {
    return this.id;
}

HandTileSchema.methods.getType = function() {
    return this.type;
}

HandTileSchema.methods.getStrength = function() {
    return this.strength;
}

HandTileSchema.methods.canReplay = function() {
    return this.replay;
}



const HandTile = model<IHandTile, IHandTileModel>('HandTile', HandTileSchema);

export default HandTile;