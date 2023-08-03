import { APP_DB_OPTIONS, DB_RETRY_CONNECT_MAX, DB_RETRY_CONNECT_TIMEOUT } from '../config/DatabasesConfig';
import { createLogger } from '../utils/logging';
import MongoDatabase from './base/MongoDatabase';

class AppDatabase extends MongoDatabase {
    private static instance: AppDatabase;

    private constructor() {
        super(APP_DB_OPTIONS, createLogger('AppDatabase'));
    }

    public static getInstance() {
        if (!AppDatabase.instance) {
            AppDatabase.instance = new AppDatabase();
        }

        return AppDatabase.instance;
    }

    public async start() {
        await super.start(DB_RETRY_CONNECT_TIMEOUT, DB_RETRY_CONNECT_MAX);
    }
}

export default AppDatabase.getInstance();