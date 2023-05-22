import { Model, Schema, Types, model } from 'mongoose';
import { BoardTileSchema, IBoardTile } from './BoardTile';
import { BOARD_TILE_SWAP_IDS, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IPlayedTile } from './PlayedTile';
import { IPlayer } from './Player';
import BoardDataManager from '../helpers/data/BoardDataManager';
import { ErrorGameBoardTileDoesNotExist } from '../errors/GameErrors';

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
    getCities: () => IBoardTile[],
    getSwapTiles: () => IBoardTile[],
    getNextFreeSwapTile: () => IBoardTile,
    areAllCitiesClosed: () => boolean,
}



export interface IBoardModel extends Model<IBoard> {

}



export const BoardSchema = new Schema<IBoard>({
    tiles: { type: [BoardTileSchema], required: true },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
BoardSchema.methods.stringify = function() {
    return ``;
}

BoardSchema.methods.getTiles = function() {
    return this.tiles;
}

BoardSchema.methods.getTileById = function(id: number) {
    const tile = (this as IBoard)
        .getTiles()
        .find(tile => tile.id === id);
    
    if (tile) {
        return tile;
    }

    throw new ErrorGameBoardTileDoesNotExist(id);
}

BoardSchema.methods.getTilesPlayedByPlayer = function(player: IPlayer) {
    return (this as IBoard)
        .getTiles()
        .map(tile => tile.playedTile)
        .filter(tile => !!tile && tile.playerId === player.getId());
}

BoardSchema.methods.getCities = function() {
    return BoardDataManager.getCities()
        .map(city => (this as IBoard).getTileById(city.id));
}

BoardSchema.methods.getSwapTiles = function() {
    return BOARD_TILE_SWAP_IDS
        .map(id => (this as IBoard).getTileById(id));
}

BoardSchema.methods.getNextFreeSwapTile = function() {
    return (this as IBoard)
        .getSwapTiles()
        .find(tile => tile.isFree());
}

BoardSchema.methods.areAllCitiesClosed = function() {
    return (this as IBoard).getCities().every(city => city.isClosed());
}



const Board = model<IBoard, IBoardModel>('Board', BoardSchema);

export default Board;