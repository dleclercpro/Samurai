import mongoose from 'mongoose';
import { sleep } from '../../libs/time';
import { TimeUnit } from '../../types/TimeTypes';
import Database from './Database';

export const isMongoError = (error: any, code: number) => {
    return (
        error.name !== undefined && error.name === 'MongoError' &&
        error.code !== undefined && error.code === code
    );
}

abstract class MongoDB extends Database {
    protected connection?: typeof mongoose;

    protected getURI() {
        const uri = this.getAnonymousURI();

        if (this.auth) {
            const { user, pass } = this.auth;

            return `mongodb://${user}:${pass}@${uri}`;
        }

        return `mongodb://${uri}`;
    }

    protected getAnonymousURI() {
        return `${this.host}:${this.port}/${this.name}`;
    }

    protected async connect() {
        this.logger.debug(`Trying to connect to: ${this.getAnonymousURI()}`);

        // Create connection to database
        this.connection = await mongoose.connect(this.getURI());

        this.logger.debug('Connected.');
    }

    public async start(wait = { time: 0, unit: TimeUnit.Millisecond }, retries = 1) {

        try {
            await this.connect();            
            return;
    
        } catch (err: any) {
            if (retries > 0) {
                this.logger.warn(`Failed to connect. Retrying in ${wait.time} ${wait.unit}.`);
    
                await sleep(wait);
                await this.start(wait, retries - 1);
            }
        }
    
        if (retries === 0) {
            const error = 'Cannot establish connection.';

            this.logger.fatal(error);

            throw new Error(error);
        }
    }

    public async startSession() {
        if (!this.connection) {
            throw new Error('Cannot start session without connection to database.');
        }

        return this.connection.startSession();
    }
}

export default MongoDB;