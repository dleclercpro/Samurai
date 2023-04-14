import { RedisClientType, createClient } from 'redis';
import Database, { DatabaseOptions } from './Database';
import { IKeyValueDatabase } from './MemoryDatabase';
import { Listener, createObserver } from '../../utils/Observer';
import { DB_RETRY_CONNECT_MAX, DB_RETRY_CONNECT_MAX_DELAY } from '../../config/DatabasesConfig';
import { toMs } from '../../libs/time';
import { TimeUnit } from '../../types/TimeTypes';
import { Logger } from 'pino';

interface SetEvent<V> {
    prevValue: V | null,
    value: V,
}

interface DeleteEvent<V> {
    prevValue: V | null,
}

abstract class RedisDB extends Database implements IKeyValueDatabase<string> {
    protected client: RedisClientType;

    protected onSetObserver = createObserver<SetEvent<string>>();
    protected onDeleteObserver = createObserver<DeleteEvent<string>>();
    
    protected constructor(options: DatabaseOptions, logger: Logger) {
        super(options, logger);

        // Instanciate Redis client
        this.client = createClient({
            url: this.getURI(),
            socket: {
                reconnectStrategy: this.retry,
            },
        });
    }

    protected getURI = () => {
        const uri = this.getAnonymousURI();

        if (this.auth) {
            const { user, pass } = this.auth;

            return `redis://${user}:${pass}@${uri}`;
        }

        return `redis://${uri}`;
    }

    protected getAnonymousURI = () => {
        return `${this.host}:${this.port}`;
    }

    public async start() {

        // Listen to events it emits
        this.listen();

        // Connect to database
        await this.client.connect();
    }

    protected listen = () => {
        this.client.on('ready', () => {
            this.logger.debug('Ready.');
        });

        this.client.on('connect', () => {
            this.logger.debug('Connected.');
        });

        this.client.on('reconnecting', () => {
            this.logger.debug('Reconnecting...');
        });

        this.client.on('end', () => {
            this.logger.debug('Disconnected.');
        });

        this.client.on('warning', (warning: any) => {
            this.logger.warn(warning.message);
        });

        this.client.on('error', (error: any) => {
            this.logger.error(error.message);
        });
    }

    protected retry = (retries: number, error: any) => {

        // End reconnecting on a specific error and flush all commands with
        // a individual error
        if (error && error.code === 'ECONNREFUSED') {
            return new Error('The server refused the connection.');
        }
        
        // End reconnecting with built in error
        if (retries > DB_RETRY_CONNECT_MAX) {
            return new Error('Number of connection retries exhausted. Stopping connection attempts.');
        }

        // Reconnect after ... ms
        const wait = Math.min(toMs({ time: retries + 0.5, unit: TimeUnit.Second }), toMs(DB_RETRY_CONNECT_MAX_DELAY));
        this.logger.debug(`Waiting ${wait} ms...`);

        return wait;
    }

    public async has(key: string) {
        return this.get(key) !== null;
    }

    public async get(key: string) {
        return this.client.get(key);
    }

    public async getAllKeys() {
        return this.client.keys('*');
    }

    public async getAll() {
        const keys = await this.getAllKeys();
        const values = await Promise.all(keys.map((key) => this.get(key)));

        return values;
    }

    public async set(key: string, value: string) {
        const prevValue = await this.get(key);

        await this.client.set(key, value);

        this.onSetObserver.publish({ prevValue, value });
    }

    public async delete(key: string) {
        const prevValue = await this.get(key);
        
        if (prevValue) {
            await this.client.del(key);

            this.onDeleteObserver.publish({ prevValue });
        }
    }

    public onSet(listener: Listener<SetEvent<string>>) {
        return this.onSetObserver.subscribe(listener);
    }

    public onDelete(listener: Listener<DeleteEvent<string>>) {
        return this.onDeleteObserver.subscribe(listener);
    }
}

export default RedisDB;