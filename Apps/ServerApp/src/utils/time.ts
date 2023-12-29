import TimeDuration from '../models/units/TimeDuration';
import { TimeUnit } from '../types/TimeTypes';

export const sleep = async (duration: TimeDuration) => {
    await new Promise(resolve => setTimeout(resolve, duration.toMs().getAmount()));
};

export const getTimeFromNow = (duration: TimeDuration) => {
    const now = new Date();

    if ((duration.getUnit() === TimeUnit.Year || duration.getUnit() === TimeUnit.Month) && duration.getAmount() % 1 !== 0) {
        throw new Error('Invalid time delta.');
    }

    let then;

    switch (duration.getUnit()) {
        case TimeUnit.Year:
            then = new Date();
            then.setFullYear(now.getFullYear() + duration.getAmount());
            break;
        case TimeUnit.Month:
            then = new Date();
            then.setMonth(now.getMonth() + duration.getAmount());
            break;
        case TimeUnit.Day:
        case TimeUnit.Hour:
        case TimeUnit.Minute:
        case TimeUnit.Second:
        case TimeUnit.Millisecond:
            then = new Date(now.getTime() + duration.toMs().getAmount());
            break;
    }

    if (!then) {
        throw new Error('Cannot compute time from now.');
    }

    return then;
}