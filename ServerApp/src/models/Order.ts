import { Model, Schema, Types, model } from 'mongoose';
import { Caste } from '../types/GameTypes';
import { CASTES, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { FromTo } from '../types';
import { GAME_INIT_VERSION } from '../constants';
import { N_FULL_HAND_TILES } from '../constants';
import { IBoardTile } from './BoardTile';
import { IHandTile } from './HandTile';

export enum OrderType {
    Normal = 'Normal',
    Move = 'Move',
    Swap = 'Swap',
}

export interface RawGameOrder {
    handTileId: number,
    boardTileIds: FromTo<number | null>,
    castes: FromTo<Caste | null>,
}

export interface GameOrder {
    handTile: IHandTile,
    boardTiles: FromTo<IBoardTile | null>,
    castes: FromTo<Caste | null>,
}

export interface IOrder extends Types.Subdocument, RawGameOrder {
    version: number,

    // Methods
    stringify: () => string,
    getVersion: () => number,
    getHandTileId: () => number,
    getBoardTileIds: () => FromTo<number | null>,
    getCastes: () => FromTo<Caste | null>,
}



export interface IOrderModel extends Model<IOrder> {

}



export const OrderSchema = new Schema<IOrder>({
    version: { type: Number, required: true, min: GAME_INIT_VERSION },
    handTileId: { type: Number, required: true, min: 0, max: N_FULL_HAND_TILES - 1 },
    boardTileIds: {
        from: { type: Number },
        to: { type: Number },
    },
    castes: {
        from: { type: String, enum: CASTES },
        to: { type: String, enum: CASTES },
    },

}, SUBDOCUMENT_SCHEMA_OPTIONS);



// METHODS
OrderSchema.methods.stringify = function() {
    return ``;
}

OrderSchema.methods.getVersion = function() {
    return this.version;
}

OrderSchema.methods.getHandTileId = function() {
    return this.handTileId;
}

OrderSchema.methods.getBoardTileIds = function() {
    return this.boardTileIds;
}

OrderSchema.methods.getCastes = function() {
    return this.castes;
}



const Order = model<IOrder, IOrderModel>('Order', OrderSchema);

export default Order;