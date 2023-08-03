import { start, stop } from './app';
import { logger } from './utils/logging';

// Run
start().catch(async (err) => {
    logger.fatal(err);

    await stop();
});