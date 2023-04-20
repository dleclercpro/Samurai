import { Model, Schema, Types, model } from 'mongoose';
import { HandTileType } from '../types/GameTypes';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';



export interface IHandTile extends Types.Subdocument {
    id: number,
    type: HandTileType,
    strength: number,
    canReplay: boolean,

    // Methods
    stringify: () => string,
}



export interface IHandTileModel extends Model<IHandTile> {

}



export const HandTileSchema = new Schema<IHandTile>({
    id: { type: Number, required: true },
    type: { type: String, enum: Object.values(HandTileType), required: true },
    strength: { type: Number, required: true },
    canReplay: { type: Boolean, required: true },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
HandTileSchema.methods.stringify = function() {
    return `[${this.parent().getId()}]: (${this.boardTileId}, ${this.handTileId})`;
}



const HandTile = model<IHandTile, IHandTileModel>('HandTile', HandTileSchema);

export default HandTile;