import { Model, Schema, Types, model } from 'mongoose';
import { HAND_SIZE, SUBDOCUMENT_SCHEMA_OPTIONS, HAND_TILE_ID_MOVE, HAND_TILE_ID_SWAP } from '../constants';
import { IHandTile, HandTileSchema } from './HandTile';
import { ErrorGameTileNotInHand } from '../errors/GameErrors';



export interface IHand extends Types.Subdocument {
    current: IHandTile[],
    remaining: IHandTile[],

    // Methods
    stringify: () => string,
    getTileById: (id: number) => IHandTile,
    hasTile: (id: number) => boolean,
    hasMoveTile: () => boolean,
    hasSwapTile: () => boolean,
    removeTile: (tile: IHandTile) => void,
    getCurrent: () => IHandTile[],
    getRemaining: () => IHandTile[],
}



export interface IHandModel extends Model<IHand> {

}



export const HandSchema = new Schema<IHand>({
    current: { type: [HandTileSchema], required: true, min: 0, max: HAND_SIZE },
    remaining: { type: [HandTileSchema], required: true },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
HandSchema.methods.stringify = function() {
    return (this as IHand).current.map(tile => tile.getId()).join(', ');
}

HandSchema.methods.getTileById = function(id: number) {
    const tile = (this as IHand).current.find(tile => tile.id === id);
    
    if (tile) {
        return tile;
    }

    throw new ErrorGameTileNotInHand(id, this as IHand);
}

HandSchema.methods.hasTile = function(id: number) {
    return !!(this as IHand).getTileById(id);
}

HandSchema.methods.hasMoveTile = function() {
    return (this as IHand).hasTile(HAND_TILE_ID_MOVE);
}

HandSchema.methods.hasSwapTile = function() {
    return (this as IHand).hasTile(HAND_TILE_ID_SWAP);
}

HandSchema.methods.removeTile = function(tileToRemove: IHandTile) {
    this.current = (this as IHand).current.filter(tile => tile.getId() !== tileToRemove.getId());
}

HandSchema.methods.getCurrent = function() {
    return this.current;
}

HandSchema.methods.getRemaining = function() {
    return this.remaining;
}



const Hand = model<IHand, IHandModel>('Hand', HandSchema);

export default Hand;