import { Model, Schema, Types, model } from 'mongoose';
import { BoardTileSchema, IBoardTile } from './BoardTile';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IPlayedTile, PlayedTileSchema } from './PlayedTile';

export enum BoardSection {
    North = 'North',
    Center = 'Center',
    South = 'South',
    SwapTiles = 'SwapTiles', // Reserved spot for played hand tiles associated with caste swaps
}



export interface IBoard extends Types.Subdocument {
    tiles: IBoardTile[],
    playedTiles: IPlayedTile[],

    // Methods
    stringify: () => string,
    getTiles: () => IBoardTile[],
    getTileById: (id: number) => IBoardTile,
}



export interface IBoardModel extends Model<IBoard> {

}



export const BoardSchema = new Schema<IBoard>({
    tiles: { type: [BoardTileSchema], required: true },
    playedTiles: { type: [PlayedTileSchema], required: true, default: [] },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



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