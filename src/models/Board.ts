import { Model, Schema, Types, model } from 'mongoose';
import { BoardTileSchema, IBoardTile } from './BoardTile';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IPlayedTile } from './PlayedTile';
import { IPlayer } from './Player';

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
    getTilesPlayedByPlayer: (player: IPlayer) => IPlayedTile[],
}



export interface IBoardModel extends Model<IBoard> {

}



export const BoardSchema = new Schema<IBoard>({
    tiles: { type: [BoardTileSchema], required: true },

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

BoardSchema.methods.getTilesPlayedByPlayer = function(player: IPlayer) {
    return (this as IBoard).tiles
        .map(tile => tile.playedTile)
        .filter(tile => !!tile && tile.playerId === player.getId());
}



const Board = model<IBoard, IBoardModel>('Board', BoardSchema);

export default Board;