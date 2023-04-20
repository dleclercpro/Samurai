import { Model, Schema, Types, model } from 'mongoose';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';



export interface IPlayedTile extends Types.Subdocument {
    handTileId: number,
    boardTileId: number,

    // Methods
    stringify: () => string,
}



export interface IPlayedTileModel extends Model<IPlayedTile> {

}



export const PlayedTileSchema = new Schema<IPlayedTile>({
    handTileId: { type: Number, required: true },
    boardTileId: { type: Number, required: true },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



PlayedTileSchema.methods.stringify = function() {
    return `[${this.parent().getId()}]: (${this.boardTileId}, ${this.handTileId})`;
}



const PlayedTile = model<IPlayedTile, IPlayedTileModel>('PlayedTile', PlayedTileSchema);

export default PlayedTile;