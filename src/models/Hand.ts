import { Model, Schema, Types, model } from 'mongoose';
import { N_HAND_TILES, SUBDOCUMENT_SCHEMA_OPTIONS, TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';
import { IHandTile, HandTileSchema } from './HandTile';



export interface IHand extends Types.Subdocument {
    current: IHandTile[],
    remaining: IHandTile[],

    // Methods
    stringify: () => string,
    getTileById: (id: number) => IHandTile,
    hasTile: (id: number) => boolean,
    hasMoveTile: () => boolean,
    hasSwapTile: () => boolean,
}



export interface IHandModel extends Model<IHand> {

}



export const HandSchema = new Schema<IHand>({
    current: { type: [HandTileSchema], required: true, min: 0, max: N_HAND_TILES },
    remaining: { type: [HandTileSchema], required: true },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
HandSchema.methods.stringify = function() {
    return ``;
}

HandSchema.methods.getTileById = function(id: number) {
    const tile = (this as IHand).current.find(tile => tile.id === id);
    
    if (tile) {
        return tile;
    }

    throw new Error(`Tile with ID ${id} does not exist.`);
}

HandSchema.methods.hasTile = function(id: number) {
    return !!(this as IHand).getTileById(id);
}

HandSchema.methods.hasMoveTile = function() {
    return (this as IHand).hasTile(TILE_ID_MOVE);
}

HandSchema.methods.hasSwapTile = function() {
    return (this as IHand).hasTile(TILE_ID_SWAP);
}



const Hand = model<IHand, IHandModel>('Hand', HandSchema);

export default Hand;