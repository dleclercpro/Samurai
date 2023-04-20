import { Model, Schema, Types, model } from 'mongoose';
import { BoardTileSchema, IBoardTile } from './BoardTile';
import { SCHEMA_WITHOUT_ID } from '../constants';

export enum BoardSection {
    North = 'North',
    Center = 'Center',
    South = 'South',
    SwapTiles = 'SwapTiles', // Reserved spot for played hand tiles associated with caste swaps
}



export interface IBoard extends Types.Subdocument {
    tiles: IBoardTile[],

    // Methods
    stringify: () => string,
    getTiles: () => IBoardTile[],
    getTileById: (id: number) => IBoardTile,
}



export interface IBoardModel extends Model<IBoard> {

}



export const BoardSchema = new Schema<IBoard>({
    tiles: { type: [BoardTileSchema], required: true },

}, SCHEMA_WITHOUT_ID);



// METHODS
BoardSchema.methods.stringify = function() {
    return ``;
}

BoardSchema.methods.getTiles = function() {
    return this.tiles;
}

BoardSchema.methods.getTileById = function(id: number) {
    const tile = (this as IBoard).tiles.find(tile => tile.id === id);
    
    if (tile) {
        return tile;
    }

    throw new Error(`Tile with ID ${id} does not exist.`);
}



const Board = model<IBoard, IBoardModel>('Board', BoardSchema);

export default Board;