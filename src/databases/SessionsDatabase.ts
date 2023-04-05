import { SESSIONS_DB_OPTIONS } from '../config/AppConfig';
import { SESSION_OPTIONS } from '../config/AuthConfig';
import Session from '../models/Session';
import SessionSerializer from '../models/SessionSerializer';
import { createLogger } from '../utils/Logging';
import RedisDB from './base/RedisDB';

class SessionsDatabase extends RedisDB {
    private static instance: SessionsDatabase; // Singleton

    protected serializer: SessionSerializer;
    
    private constructor() {
        super(SESSIONS_DB_OPTIONS, createLogger('SessionsDatabase'));

        this.serializer = new SessionSerializer(SESSION_OPTIONS.secret);
    }

    public static getInstance() {
        if (!SessionsDatabase.instance) {
            SessionsDatabase.instance = new SessionsDatabase();
        }

        return SessionsDatabase.instance;
    }

    public async getSessionById(id: string) {
        const session = await this.get(id);

        if (session) {
            return this.serializer.deserialize(session);
        }
    }

    public async setSession(session: Session) {
        await this.set(session.getId(), this.serializer.serialize(session));
    }

    public async deleteSession(session: Session) {
        await this.delete(session.getId());
    }
}

export default SessionsDatabase.getInstance();