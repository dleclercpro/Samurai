import { Model, Schema, Types, model } from 'mongoose';
import { N_HAND_TILES, SUBDOCUMENT_SCHEMA_OPTIONS, TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';
import { IHandTile, HandTileSchema } from './HandTile';



export interface IHand extends Types.Subdocument {
    current: IHandTile[],
    remaining: IHandTile[],

    // Methods
    stringify: () => string,
    hasTile: (id: number) => boolean,
    hasMoveTile: () => boolean,
    hasSwapTile: () => boolean,
}



export interface IHandModel extends Model<IHand> {

}



export const HandSchema = new Schema<IHand>({
    current: { type: [HandTileSchema], required: true, min: N_HAND_TILES, max: N_HAND_TILES },
    remaining: { type: [HandTileSchema], required: true },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
HandSchema.methods.stringify = function() {
    return ``;
}

HandSchema.methods.hasTile = function(id: number) {
    return this.current.map((tile: IHandTile) => tile.id).includes(id);
}

HandSchema.methods.hasMoveTile = function() {
    return this.hasTile(TILE_ID_MOVE);
}

HandSchema.methods.hasSwapTile = function() {
    return this.hasTile(TILE_ID_SWAP);
}



const Hand = model<IHand, IHandModel>('Hand', HandSchema);

export default Hand;