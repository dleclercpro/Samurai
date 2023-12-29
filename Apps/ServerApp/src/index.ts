import { start, stop } from './app';
import TimeDuration from './models/units/TimeDuration';
import { TimeUnit } from './types/TimeTypes';
import { logger } from './utils/logging';
import { killAfterTimeout } from './utils/process';



// Graceful shutdown
const TIMEOUT = new TimeDuration(2, TimeUnit.Second);

const handleStopSignal = async (signal: string) => {
    logger.warn(`Received stop signal: ${signal}`);

    await Promise.race([stop(), killAfterTimeout(TIMEOUT)]);
}

process.on('SIGTERM', handleStopSignal);
process.on('SIGINT', handleStopSignal);



// Run
start().catch(async (err) => {
    logger.fatal(err);

    await stop();
});