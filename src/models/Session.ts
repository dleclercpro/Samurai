import crypto from 'crypto';
import { database } from '..';
import { SESSION_DURATION } from '../config/AuthConfig';
import { toMs } from '../libs/time';
import { TimeUnit } from '../types/TimeTypes';
import { logger } from '../utils/Logging';
import User from './User';

class Session {
    protected id: string;
    protected email: string;
    protected expirationDate: Date;
    public staySignedIn: boolean;

    public constructor(id: string, email: string, expirationDate: Date, staySignedIn: boolean) {
        this.id = id;
        this.email = email;
        this.expirationDate = expirationDate;
        this.staySignedIn = staySignedIn;
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

    public getExpirationDate() {
        return this.expirationDate;
    }

    public async extend(time: number, unit: TimeUnit) {
        this.expirationDate = new Date(this.expirationDate.getTime() + toMs(time, unit));

        await this.save();

        logger.debug(`Extended session of user: ${this.email}`);
    }

    public async save() {
        database.setSession(this);

        logger.debug(`Stored session of user: ${this.email}`);
    }

    public async delete() {
        database.removeSession(this);

        logger.debug(`Deleted session of user: ${this.email}`);
    }

    // STATIC METHODS
    protected static generateId() {
        return crypto.randomUUID();
    }

    public static async findById(id: string) {
        return database.getSessionById(id);
    }

    public static async create(email: string, staySignedIn: boolean = false) {
        let id = '';

        // Find a unique, non-existent ID for the new session 
        while (!id || await Session.findById(id)) {
            id = Session.generateId();
        }

        // Generate default expiration date for session
        const expirationDate = new Date(new Date().getTime() + toMs(SESSION_DURATION.time, SESSION_DURATION.unit));

        // Create session
        const session = new Session(id, email, expirationDate, staySignedIn);

        // Store session in database
        await session.save();

        return session;
    }
}

export default Session;