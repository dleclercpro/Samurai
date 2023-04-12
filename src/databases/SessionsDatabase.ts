import { SESSIONS_DB_OPTIONS } from '../config/AppConfig';
import { SESSION_OPTIONS } from '../config/AuthConfig';
import Session from '../models/auth/Session';
import SessionSerializer from '../models/auth/SessionSerializer';
import { createLogger } from '../utils/Logging';
import RedisDB from './base/RedisDB';
import { schedule } from 'node-cron';

class SessionsDatabase extends RedisDB {
    private static instance: SessionsDatabase; // Singleton

    private serializer: SessionSerializer;
    
    private constructor() {
        super(SESSIONS_DB_OPTIONS, createLogger('SessionsDatabase'));

        this.serializer = new SessionSerializer(SESSION_OPTIONS.secret);
    }

    public async start() {
        await super.start();
        await this.scheduleCleanUps('0 0 */1 * * *');
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

    private async getAllSessions() {
        const sessions = await this.getAll();
        
        return sessions.map(session => this.serializer.deserialize(session!));
    }

    public async setSession(session: Session) {
        await this.set(session.getId(), this.serializer.serialize(session));
    }

    public async deleteSession(session: Session) {
        await this.delete(session.getId());
    }

    // Clean up expired sessions
    private async scheduleCleanUps(cronExpression: string) {
        await this.removeExpiredSessions();

        schedule(cronExpression, () => this.removeExpiredSessions());
    }

    private async removeExpiredSessions() {
        this.logger.debug(`Removing expired sessions from database...`);

        const sessions = await this.getAllSessions();
        const expiredSessions = sessions.filter(session => session.isExpired());

        await Promise.all(expiredSessions.map(session => session.delete()));
    }
}

export default SessionsDatabase.getInstance();