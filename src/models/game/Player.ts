import crypto from 'crypto';
import { Color } from '../../types/GameTypes';
import { IUser } from '../User';
import Game from './Game';

class Player {
    private id: string;
    private game: Game;
    private user: IUser;
    private color: Color;

    public constructor(id: string, game: Game, user: IUser, color: Color) {
        this.id = id;
        this.game = game;
        this.user = user;
        this.color = color;
    }

    public toString() {
        return `[Game ${this.game.getId()}]: (${this.user.getId()}, ${this.id})`;
    }

    public getId() {
        return this.id;
    }

    public getUser() {
        return this.user;
    }

    // STATIC METHODS
    protected static generateId() {
        return crypto.randomUUID();
    }

    public static async findById(id: string) {

    }
}

export default Player;