import { Logger } from 'pino';
import { Auth } from '../../types';
import { logger as _logger } from '../../utils/logging';

export interface DatabaseOptions {
    host: string,
    port: number,
    name: string,
    auth?: Auth,
}

abstract class Database {
    protected host: string;
    protected port: number;
    protected name: string;
    protected auth?: Auth;

    protected logger: Logger;

    protected abstract getURI(): string;
    protected abstract getAnonymousURI(): string;

    public constructor(options: DatabaseOptions, logger?: Logger) {
        const { host, port, name, auth } = options;

        this.host = host;
        this.port = port;
        this.name = name;
        this.auth = auth;

        this.logger = logger ? logger : _logger;
    }
}

export default Database;