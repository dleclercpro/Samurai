import { SESSIONS_DB_OPTIONS } from '../config/DatabasesConfig';
import { SESSION_OPTIONS } from '../config/AuthConfig';
import Session from '../helpers/Session';
import SessionSerializer from '../helpers/SessionSerializer';
import { createLogger } from '../utils/logging';
import RedisDatabase from './base/RedisDatabase';
import { ScheduledTask, schedule } from 'node-cron';

class SessionsDatabase extends RedisDatabase {
    private static instance: SessionsDatabase; // Singleton

    private serializer: SessionSerializer;
    private cleanUpTask: ScheduledTask;
    
    private constructor() {
        super(SESSIONS_DB_OPTIONS, createLogger('SessionsDatabase'));

        this.serializer = new SessionSerializer(SESSION_OPTIONS.secret);
        this.cleanUpTask = schedule('0 0 */1 * * *', () => this.removeExpiredSessions(), {
            runOnInit: false,
        });
    }

    public async start() {
        await super.start();

        // Remove expired sessions on start
        await this.removeExpiredSessions();

        this.cleanUpTask.start();
    }

    public async stop() {
        await super.stop();

        this.cleanUpTask.stop();
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
    private async removeExpiredSessions() {
        this.logger.debug(`Removing expired sessions from database...`);

        const sessions = await this.getAllSessions();
        const expiredSessions = sessions.filter(session => session.isExpired());

        await Promise.all(expiredSessions.map(session => session.delete()));
    }
}

export default SessionsDatabase.getInstance();