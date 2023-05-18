import { Model, Schema, Types, model } from 'mongoose';
import { Caste, HandTileType } from '../types/GameTypes';
import { CASTES, SUBDOCUMENT_SCHEMA_OPTIONS } from '../constants';
import HandDataManager from '../helpers/data/HandDataManager';
import Score, { IScore } from './Score';



export interface IHandTile extends Types.Subdocument {
    id: number,

    // Methods
    stringify: () => string,
    getId: () => number,
    getType: () => HandTileType,
    getStrength: () => number,
    canReplay: () => boolean,
    computeScore: () => IScore,
}



export interface IHandTileModel extends Model<IHandTile> {

}



export const HandTileSchema = new Schema<IHandTile>({
    id: { type: Number, required: true },

}, { ...SUBDOCUMENT_SCHEMA_OPTIONS, _id: false });



// METHODS
HandTileSchema.methods.stringify = function() {
    return ``;
}

HandTileSchema.methods.getId = function() {
    return this.id;
}

HandTileSchema.methods.getType = function() {
    return HandDataManager.getTileTypeById(this.id);
}

HandTileSchema.methods.getStrength = function() {
    return HandDataManager.getTileStrengthById(this.id);
}

HandTileSchema.methods.canReplay = function() {
    return HandDataManager.getTileReplayById(this.id);
}

HandTileSchema.methods.computeScore = function() {
    return CASTES.reduce((score: IScore, caste: Caste) => {

        // Add hand tile strength to score if hand tile's type is either matching the current
        // caste, or it is a joker tile (i.e. samurai/ship tile)
        if ([HandTileType.Samurai, HandTileType.Ship, caste].includes(this.getType())) {
            const casteScore = new Score();
            
            casteScore.setByCaste(caste, this.getStrength());

            return score.add(casteScore);
        }
        
        return score;

    }, new Score());
}



const HandTile = model<IHandTile, IHandTileModel>('HandTile', HandTileSchema);

export default HandTile;