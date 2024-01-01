import mongoose from 'mongoose';
import { sleep } from '../../utils/time';
import { TimeUnit } from '../../types/TimeTypes';
import Database from './Database';
import TimeDuration from '../../models/units/TimeDuration';

export const isMongoError = (error: any, code: number) => {
    return (
        error.name !== undefined && error.name === 'MongoError' &&
        error.code !== undefined && error.code === code
    );
}

abstract class MongoDatabase extends Database {
    protected client?: typeof mongoose;

    protected getURI() {
        let uri = this.getAnonymousURI();

        if (this.auth) {
            const { user, pass } = this.auth;

            uri = uri.replace('[USER]', encodeURIComponent(user));
            uri = uri.replace('[PASS]', encodeURIComponent(pass));
        }

        return uri;
    }

    protected getAnonymousURI() {
        const uri = `${this.host}:${this.port}/${this.name}`;

        if (this.auth) {
            return `mongodb://[USER]:[PASS]@${uri}`;
        }

        return `mongodb://${uri}`;
    }

    protected async connect() {
        this.logger.debug(`Trying to connect to: ${this.getAnonymousURI()}`);

        // Create connection to database
        this.client = await mongoose.connect(this.getURI());

        this.logger.debug('Connected.');
    }

    protected async disconnect() {
        await this.client?.disconnect();

        this.logger.debug('Disconnected.');
    }

    public async start(wait = new TimeDuration(0, TimeUnit.Millisecond), retries = 1) {

        try {
            await this.connect();            
            return;
    
        } catch (err: unknown) {
            if (retries > 0) {
                this.logger.warn(`Failed to connect. Retrying in ${wait.format()}.`);
    
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

    public async stop() {
        await this.disconnect();
    }
}

export default MongoDatabase;