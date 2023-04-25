import { Types, Schema, Model, model } from 'mongoose';
import { Caste, HandTileType } from '../types/GameTypes';
import BoardData from '../helpers/data/BoardDataManager';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IPlayedTile, PlayedTileSchema } from './PlayedTile';
import { IHandTile } from './HandTile';
import BoardDataManager from '../helpers/data/BoardDataManager';
import { IBoard } from './Board';

export interface BoardTileCoordinates {
    x: number,
    y: number,
}

export enum BoardTileType {
    Ground = 'Ground',
    Water = 'Water',
    Swap = 'Swap',
}



export interface IBoardTile extends Types.Subdocument {
    id: number,
    castes: Caste[],
    playedTile?: IPlayedTile,

    // Methods
    stringify: () => string,
    getId: () => string,
    getType: () => BoardTileType,
    getPlayedTile: () => IPlayedTile,
    getNeighboringTiles: () => IBoardTile[],
    getNeighboringCities: () => IBoardTile[],
    getCastePieceCountByType: (caste: Caste) => number,
    hasCastePiece: (caste: Caste) => boolean,
    addCastePiece: (caste: Caste) => void,
    removeCastePiece: (caste: Caste) => void,
    removeCastePiecesByCaste: (caste: Caste) => void,
    setTile: (tile: IPlayedTile) => void,
    removeTile: () => void,
    isFree: () => boolean,
    isCity: () => boolean,
    isClosed: () => boolean,
    isHandTileCompatible: (handTile: IHandTile) => boolean,
}



export interface IBoardTileModel extends Model<IBoardTile> {

}



export const BoardTileSchema = new Schema<IBoardTile>({
    id: { type: Number, required: true },
    castes: { type: [String], enum: Object.values(Caste), required: true, default: [] },
    playedTile: { type: PlayedTileSchema },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



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
    return (this as IBoardTile).castes.filter(c => c === caste).length;
}

BoardTileSchema.methods.hasCastePiece = function(caste: Caste) {
    return this.castes.includes(caste);
}

BoardTileSchema.methods.addCastePiece = function(caste: Caste) {
    this.castes = [...this.castes, caste];
}

BoardTileSchema.methods.removeCastePiece = function(caste: Caste) {
    const indexToRemove = this.castes.indexOf(caste);

    if (indexToRemove === -1) {
        throw new Error('Cannot remove absent caste piece from board tile!');
    }

    this.castes = [...this.castes.slice(0, indexToRemove), ...this.castes.slice(indexToRemove + 1)];
}

BoardTileSchema.methods.removeCastePiecesByCaste = function(caste: Caste) {
    this.castes = (this as IBoardTile).castes.filter(c => c !== caste);
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

BoardTileSchema.methods.isCity = function() {
    return this.castes.length > 0;
}

BoardTileSchema.methods.isClosed = function() {
    if (!this.isCity()) {
        throw new Error('This board tile is not a city, so it cannot be closed.');
    }

    return (this as IBoardTile).getNeighboringTiles().every(tile => !tile.isFree());
}

BoardTileSchema.methods.isHandTileCompatible = function(handTile: IHandTile) {
    switch (this.type) {
        case BoardTileType.Ground:
            return [HandTileType.Military, HandTileType.Religion, HandTileType.Commerce, HandTileType.Samurai, HandTileType.Move].includes(handTile.getType());
        case BoardTileType.Water:
            return handTile.getType() === HandTileType.Ship;
        case BoardTileType.Swap:
            return handTile.getType() === HandTileType.Swap;
        default:
            throw new Error(`Unknown board tile: ${this.type}`);
    }
}



const BoardTile = model<IBoardTile, IBoardTileModel>('BoardTile', BoardTileSchema);

export default BoardTile;