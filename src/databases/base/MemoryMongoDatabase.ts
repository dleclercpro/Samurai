import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Logger } from 'pino';

abstract class MemoryMongoDatabase {
    protected server?: MongoMemoryServer;
    protected client?: typeof mongoose;
    protected logger: Logger;

    public constructor(logger: Logger) {
        this.logger = logger;
    }

    protected getURI() {
        if (!this.server) {
            throw new Error('Missing server: no database URI.');
        }
        
        return this.server.getUri();
    }

    protected async connect() {

        // Create memory database server
        this.server = await MongoMemoryServer.create();

        this.logger.debug(`Trying to connect to: ${this.getURI()}`);

        // Create connection to database
        this.client = await mongoose.connect(this.getURI());

        this.logger.debug('Connected.');
    }

    protected async disconnect() {
        await this.client?.disconnect();
        await this.server?.stop();

        this.logger.debug('Disconnected.');
    }

    public async start() {
        await this.connect();            
    }

    public async stop() {
        await this.disconnect();
    }
}

export default MemoryMongoDatabase;