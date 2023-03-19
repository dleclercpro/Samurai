import Game from '../models/game/Game';
import Session from '../models/Session';
import User from '../models/User';
import { KeyValueDatabase } from './KeyValueDatabase';



// Singleton
export class MemoryDatabase {
    private static instance: MemoryDatabase;

    private sessions: KeyValueDatabase<Session>;
    private users: KeyValueDatabase<User>;
    private games: KeyValueDatabase<Game>;

    private constructor() {
        this.sessions = new KeyValueDatabase<Session>();
        this.users = new KeyValueDatabase<User>();
        this.games = new KeyValueDatabase<Game>();
    }

    public static get() {
        if (!MemoryDatabase.instance) {
            MemoryDatabase.instance = new MemoryDatabase();
        }

        return MemoryDatabase.instance;
    }

    // Sessions
    public getSessionById(id: string) {
        return this.sessions.get(id);
    }

    public setSession(session: Session) {
        this.sessions.set(session.getId(), session);
    }

    public removeSession(session: Session) {
        this.sessions.remove(session.getId());
    }

    // Users
    public getUserById(id: string) {
        return this.users.get(id);
    }

    public setUser(user: User) {
        this.users.set(user.getId(), user);
    }

    public removeUser(user: User) {
        this.users.remove(user.getId());
    }

    // Games
    public getGameById(id: string) {
        return this.games.get(id);
    }

    public setGame(game: Game) {
        this.games.set(game.getId(), game);
    }

    public getGameCount() {
        return this.games.size();
    }
}