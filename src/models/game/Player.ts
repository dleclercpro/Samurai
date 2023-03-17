import { Color } from '../types/GameTypes';
import User from './User';

class Player {
    private id: string;
    private gameId: string;
    private userId: string;
    private color: Color;

    public constructor(id: string, gameId: string, user: User, color: Color) {
        this.id = id;
        this.gameId = gameId;
        this.userId = user.getId();
        this.color = color;
    }

    public toString() {
        return `[Game ${this.gameId}]: (${this.userId}, ${this.id})`;
    }
}

export default Player;