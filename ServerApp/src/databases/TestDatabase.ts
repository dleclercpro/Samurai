import MemoryMongoDatabase from './base/MemoryMongoDatabase';
import { createLogger } from '../utils/Logging';

class TestDatabase extends MemoryMongoDatabase {
    private static instance: TestDatabase;

    private constructor() {
        super(createLogger('TestDatabase'));
    }

    public static getInstance() {
        if (!TestDatabase.instance) {
            TestDatabase.instance = new TestDatabase();
        }

        return TestDatabase.instance;
    }
}

export default TestDatabase.getInstance();