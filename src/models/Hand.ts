import { Document, Schema } from 'mongoose';
import { N_HAND_TILES, TILE_ID_MOVE, TILE_ID_SWAP } from '../constants';

export interface IHand extends Document {
    tiles: number[],

    // Methods
    stringify: () => string,
    hasTile: (id: number) => boolean,
    hasMoveTile: () => boolean,
    hasSwapTile: () => boolean,
}



export const HandSchema = new Schema<IHand>({
    tiles: { type: [Number], required: true, min: N_HAND_TILES, max: N_HAND_TILES },
});



HandSchema.methods.stringify = function() {
    return ``;
}

HandSchema.methods.hasTile = function(id: number) {
    return this.tiles.includes(id);
}

HandSchema.methods.hasMoveTile = function() {
    return this.hasTile(TILE_ID_MOVE);
}

HandSchema.methods.hasSwapTile = function() {
    return this.hasTile(TILE_ID_SWAP);
}