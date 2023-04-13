import { Document, Schema } from 'mongoose';

export interface IPlayedTile extends Document {
    handTileId: number,
    boardTileId: number,

    // Methods
    stringify: () => string,
}



export const PlayedTileSchema = new Schema<IPlayedTile>({
    handTileId: { type: Number, required: true },
    boardTileId: { type: Number, required: true },
});



PlayedTileSchema.methods.stringify = function() {
    return `[${this.parent().getId()}]: (${this.boardTileId}, ${this.handTileId})`;
}