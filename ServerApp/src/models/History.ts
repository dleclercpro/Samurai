import { Document, model, Model, Schema } from 'mongoose';
import Order, { IOrder, OrderSchema, RawGameOrder } from './Order';
import { deepCopy } from '../libs';
import { IGame } from './Game';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';

export interface IHistory extends Document {
    orders: IOrder[],

    // Methods
    stringify: () => string,
    getOrder: (version: number) => RawGameOrder,
    getOrdersSince: (version: number) => RawGameOrder[],
    pushOrder: (order: RawGameOrder) => void,
}



export interface IHistoryModel extends Model<IHistory> {

}



export const HistorySchema = new Schema<IHistory>({
    orders: { type: [OrderSchema], required: true, default: [] },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
HistorySchema.methods.stringify = function() {
    return ``;
}

HistorySchema.methods.getOrder = function(version: number) {
    return (this as IHistory).orders.find(order => order.getVersion() === version);
}

HistorySchema.methods.getOrdersSince = function(version: number) {
    return (this as IHistory).orders.filter(order => order.getVersion() > version);
}

HistorySchema.methods.pushOrder = function(_order: RawGameOrder) {
    const game = this.ownerDocument() as IGame;
    const order = deepCopy(_order);
    const { boardTileIds, castes } = order;

    // Format order for database
    if (boardTileIds.from === null) {
        delete order.boardTileIds.from;
    }
    if (boardTileIds.to === null) {
        delete order.boardTileIds.to;
    }
    if (castes.from === null) {
        delete order.castes.from;
    }
    if (castes.to === null) {
        delete order.castes.to;
    }

    this.orders.push(new Order({
        version: game.getVersion(),
        ...order,
    }));
}



const History = model<IHistory, IHistoryModel>('History', HistorySchema);

export default History;