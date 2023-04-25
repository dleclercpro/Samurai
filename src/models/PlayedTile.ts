import { Model, Schema, Types, model } from 'mongoose';
import { SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import { IBoardTile } from './BoardTile';
import { HandTileSchema, IHandTile } from './HandTile';
import { IPlayer } from './Player';
import { IGame } from './Game';



export interface IPlayedTile extends Types.Subdocument {
    playerId: string,
    handTile: IHandTile,

    // Methods
    stringify: () => string,
    getPlayer: () => IPlayer,
    getBoardTile: () => IBoardTile,
    getHandTile: () => IHandTile,
}



export interface IPlayedTileModel extends Model<IPlayedTile> {

}



export const PlayedTileSchema = new Schema<IPlayedTile>({
    playerId: { type: String, required: true },
    handTile: { type: HandTileSchema, required: true },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
PlayedTileSchema.methods.stringify = function() {
    const boardTile = this.parent() as IBoardTile;
    
    return `Player ${this.playerId}: [Board tile: ${boardTile.getId()}, Hand tile: ${this.handTileId}]`;
}

PlayedTileSchema.methods.getPlayer = function() {
    return (this.ownerDocument() as IGame).getPlayers().find(player => player.getId() === this.playerId);
}

PlayedTileSchema.methods.getBoardTile = function() {
    return this.parent();
}

PlayedTileSchema.methods.getHandTile = function() {
    return this.handTile;
}



const PlayedTile = model<IPlayedTile, IPlayedTileModel>('PlayedTile', PlayedTileSchema);

export default PlayedTile;