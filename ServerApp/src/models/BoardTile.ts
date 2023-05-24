import { Types, Schema, Model, model } from 'mongoose';
import { Caste, Coordinates2D, HandTileType } from '../types/GameTypes';
import BoardData from '../helpers/data/BoardDataManager';
import { CASTES, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IPlayedTile, PlayedTileSchema } from './PlayedTile';
import { IHandTile } from './HandTile';
import BoardDataManager from '../helpers/data/BoardDataManager';
import { BoardSection, IBoard } from './Board';
import { ErrorGameBoardTileNotACity } from '../errors/GameErrors';

export enum BoardTileType {
    Ground = 'Ground',
    Water = 'Water',
    Swap = 'Swap',
}



export interface IBoardTile extends Types.Subdocument {
    id: number,
    castePieces: Caste[],
    remainingCastePieces: Caste[],
    playedTile?: IPlayedTile,

    // Methods
    stringify: () => string,
    getId: () => number,
    getType: () => BoardTileType,
    getSection: () => BoardSection,
    getCoordinates: () => Coordinates2D,
    getPlayedTile: () => IPlayedTile,
    getNeighboringTiles: () => IBoardTile[],
    getNeighboringCities: () => IBoardTile[],
    getCastePieceCountByType: (caste: Caste) => number,
    getStartCastePieces: () => Caste[],
    getCastePieces: () => Caste[],
    hasCastePiece: (caste: Caste) => boolean,
    addCastePiece: (caste: Caste) => void,
    removeCastePiece: (caste: Caste) => void,
    removeCastePiecesByCaste: (caste: Caste) => void,
    setTile: (tile: IPlayedTile) => void,
    removeTile: () => void,
    isFree: () => boolean,
    isGround: () => boolean,
    isWater: () => boolean,
    isSwap: () => boolean,
    isCity: () => boolean,
    isClosed: () => boolean,
    isHandTileCompatible: (handTile: IHandTile) => boolean,
}



export interface IBoardTileModel extends Model<IBoardTile> {

}



export const BoardTileSchema = new Schema<IBoardTile>({
    id: { type: Number, required: true },
    castePieces: { type: [String], enum: CASTES, required: true, default: [] },
    remainingCastePieces: { type: [String], enum: CASTES, required: true, default: [] },
    playedTile: { type: PlayedTileSchema },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
BoardTileSchema.methods.stringify = function() {
    return ``;
}

BoardTileSchema.methods.getId = function() {
    return this.id;
}

BoardTileSchema.methods.getType = function() {
    return BoardData.getTileTypeById(this.id);
}

BoardTileSchema.methods.getSection = function() {
    return BoardData.getTileSectionById(this.id);
}

BoardTileSchema.methods.getCoordinates = function() {
    return BoardData.getTileCoordinatesById(this.id);
}

BoardTileSchema.methods.getPlayedTile = function() {
    return this.playedTile;
}

BoardTileSchema.methods.getNeighboringTiles = function() {
    const board = this.parent() as IBoard;

    return BoardDataManager.getTileNeighborsById(this.id)
        .map(tile => board.getTileById(tile.id));
}

BoardTileSchema.methods.getNeighboringCities = function() {
    return (this as IBoardTile).getNeighboringTiles().filter(tile => tile.isCity());
}

BoardTileSchema.methods.getCastePieceCountByType = function(caste: Caste) {
    return (this as IBoardTile).remainingCastePieces.filter(c => c === caste).length;
}

BoardTileSchema.methods.getStartCastePieces = function() {
    return this.castePieces;
}

BoardTileSchema.methods.getCastePieces = function() {
    return this.remainingCastePieces;
}

BoardTileSchema.methods.hasCastePiece = function(caste: Caste) {
    return this.remainingCastePieces.includes(caste);
}

BoardTileSchema.methods.addCastePiece = function(caste: Caste) {
    this.remainingCastePieces = [...this.remainingCastePieces, caste];
}

BoardTileSchema.methods.removeCastePiece = function(caste: Caste) {
    const indexToRemove = this.remainingCastePieces.indexOf(caste);

    if (indexToRemove === -1) {
        throw new Error('Cannot remove absent caste piece from board tile!');
    }

    this.remainingCastePieces = [...this.remainingCastePieces.slice(0, indexToRemove), ...this.remainingCastePieces.slice(indexToRemove + 1)];
}

BoardTileSchema.methods.removeCastePiecesByCaste = function(caste: Caste) {
    this.remainingCastePieces = (this as IBoardTile).remainingCastePieces.filter(c => c !== caste);
}

BoardTileSchema.methods.setTile = function(playedTile: IPlayedTile) {
    this.playedTile = playedTile;
}

BoardTileSchema.methods.removeTile = function() {
    this.playedTile = undefined;
}

BoardTileSchema.methods.isFree = function() {
    return !this.playedTile;
}

BoardTileSchema.methods.isGround = function() {
    return (this as IBoardTile).getType() === BoardTileType.Ground;
}

BoardTileSchema.methods.isWater = function() {
    return (this as IBoardTile).getType() === BoardTileType.Water;
}

BoardTileSchema.methods.isSwap = function() {
    return (this as IBoardTile).getType() === BoardTileType.Swap;
}

BoardTileSchema.methods.isCity = function() {
    return this.castePieces.length > 0;
}

BoardTileSchema.methods.isClosed = function() {
    if (!this.isCity()) {
        throw new ErrorGameBoardTileNotACity(this as IBoardTile);
    }

    return (this as IBoardTile).getNeighboringTiles().every(tile => !tile.isFree() || tile.isWater());
}

BoardTileSchema.methods.isHandTileCompatible = function(handTile: IHandTile) {
    const type = this.getType();

    switch (type) {
        case BoardTileType.Ground:
            return [HandTileType.Military, HandTileType.Religion, HandTileType.Commerce, HandTileType.Samurai, HandTileType.Move].includes(handTile.getType());
        case BoardTileType.Water:
            return handTile.getType() === HandTileType.Ship;
        case BoardTileType.Swap:
            return handTile.getType() === HandTileType.Swap;
    }
}



const BoardTile = model<IBoardTile, IBoardTileModel>('BoardTile', BoardTileSchema);

export default BoardTile;