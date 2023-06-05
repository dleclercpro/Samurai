import { Model, Schema, Types, model } from 'mongoose';
import { Caste } from '../types/GameTypes';
import { CASTES, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { FromTo } from '../types';
import { GAME_INIT_VERSION } from '../constants';
import { N_FULL_HAND_TILES } from '../constants';
import { IBoardTile } from './BoardTile';
import { IHandTile } from './HandTile';
import { IGame } from './Game';
import { IPlayer } from './Player';

export enum OrderType {
    Normal = 'Normal',
    Move = 'Move',
    Swap = 'Swap',
}

export interface GameOrder {
    handTileId: number,
    boardTileIds: FromTo<number | null>,
    castes: FromTo<Caste | null>,
}

export interface PopulatedGameOrder {
    handTile: IHandTile,
    boardTiles: FromTo<IBoardTile | null>,
    castes: FromTo<Caste | null>,
}

export interface IOrder extends Types.Subdocument, GameOrder {
    version: number,
    playerId: string,

    // Methods
    stringify: () => string,
    getVersion: () => number,
    getPlayer: () => IPlayer,
    getHandTileId: () => number,
    getBoardTileIds: () => FromTo<number | null>,
    getCastes: () => FromTo<Caste | null>,
}



export interface IOrderModel extends Model<IOrder> {

}



export const OrderSchema = new Schema<IOrder>({
    version: { type: Number, required: true, min: GAME_INIT_VERSION },
    playerId: { type: String, required: true },
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

OrderSchema.methods.getPlayer = function() {
    return (this.ownerDocument as IGame).getPlayers().find(player => player.getId() === this.playerId);
}

OrderSchema.methods.getHandTileId = function() {
    return this.handTileId;
}

OrderSchema.methods.getBoardTileIds = function() {
    return {
        from: this.boardTileIds.from ?? null,
        to: this.boardTileIds.to ?? null,
    };
}

OrderSchema.methods.getCastes = function() {
    return {
        from: this.castes.from ?? null,
        to: this.castes.to ?? null,
    };
}



const Order = model<IOrder, IOrderModel>('Order', OrderSchema);

export default Order;