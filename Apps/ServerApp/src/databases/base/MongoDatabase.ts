import mongoose from 'mongoose';
import { sleep } from '../../utils/time';
import { TimeUnit } from '../../types/TimeTypes';
import Database from './Database';

export const isMongoError = (error: any, code: number) => {
    return (
        error.name !== undefined && error.name === 'MongoError' &&
        error.code !== undefined && error.code === code
    );
}

abstract class MongoDatabase extends Database {
    protected client?: typeof mongoose;

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
        this.client = await mongoose.connect(this.getURI());

        this.logger.debug('Connected.');
    }

    protected async disconnect() {
        await this.client?.disconnect();

        this.logger.debug('Disconnected.');
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

    public async stop() {
        await this.disconnect();
    }
}

export default MongoDatabase;