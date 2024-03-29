import crypto from 'crypto';
import { logger } from '../utils/logging';
import SessionsDatabase from '../databases/SessionsDatabase';
import TimeDuration from '../models/units/TimeDuration';

class Session {
    protected id: string;
    protected email: string;
    protected username: string;
    protected expirationDate?: Date;
    protected touch: boolean;

    public constructor(id: string, email: string, username: string, touch: boolean, expirationDate?: Date) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.touch = touch;
        this.expirationDate = expirationDate;
    }

    public stringify() {
        return this.getId();
    }

    public getId() {
        return this.id;
    }

    public getEmail() {
        return this.email;
    }

    public getUsername() {
        return this.username;
    }

    public hasTouch() {
        return this.touch;
    }

    public getExpirationDate() {
        return this.expirationDate;
    }

    public isExpired() {
        return this.expirationDate && this.expirationDate <= new Date();
    }

    public async extend(duration: TimeDuration) {
        if (!this.expirationDate) {
            throw new Error('Cannot extend a session that has no expiration date!');
        }

        // Update expiration date
        this.expirationDate = new Date(this.expirationDate.getTime() + duration.toMs().getAmount());

        await this.save();

        logger.debug(`Extended session of user: ${this.email}`);
    }

    public async save() {
        await SessionsDatabase.setSession(this);

        logger.debug(`Stored session of user: ${this.email}`);
    }

    public async delete() {
        await SessionsDatabase.deleteSession(this);

        logger.debug(`Deleted session of user: ${this.email}`);
    }

    // STATIC METHODS
    protected static generateId() {
        return crypto.randomUUID();
    }

    public static async findById(id: string) {
        return SessionsDatabase.getSessionById(id);
    }

    // TODO: clean Redis DB from time to time from older sessions of same user
    public static async create(email: string, username: string, staySignedIn: boolean = false, duration?: TimeDuration) {
        let id = '';

        // Find a unique, non-existing ID for the new session 
        while (!id || await Session.findById(id)) {
            id = Session.generateId();
        }

        // Generate expiration date for session
        const expirationDate = duration ? new Date(new Date().getTime() + duration.toMs().getAmount()) : undefined;

        // Create session
        const session = new Session(id, email, username, staySignedIn, expirationDate);

        // Store session in database
        await session.save();

        return session;
    }
}

export default Session;