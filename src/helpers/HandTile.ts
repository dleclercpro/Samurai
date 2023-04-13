import { Caste } from '../types/GameTypes';

export enum SpecialHandTileType {
    Samurai = 'Samurai',
    Move = 'Move',
    Swap = 'Swap',
    Ship = 'Ship',
}

export type HandTileType = Caste | SpecialHandTileType;



class HandTile {
    protected id: number;
    protected type: HandTileType;
    protected strength: number;
    protected canReplay: boolean;

    public constructor(id: number, type: HandTileType, strength: number, canReplay: boolean) {
        this.id = id;
        this.type = type;
        this.strength = strength;
        this.canReplay = canReplay;
    }

    public getId() {
        return this.id;
    }

    public getType() {
        return this.type;
    }

    public getStrength() {
        return this.strength;
    }

    public canPlayerReplay() {
        return this.canReplay;
    }
}

export default HandTile;