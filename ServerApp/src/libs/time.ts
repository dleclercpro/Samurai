import { TimeDuration, TimeUnit } from '../types/TimeTypes';

export const sleep = async (duration: TimeDuration) => {
    await new Promise(resolve => setTimeout(resolve, toMs(duration)));
};

export const toMs = (duration: TimeDuration) => {
    const { time, unit } = duration;

    let t; // ms

    switch (unit) {
        case TimeUnit.Day:
            t = time * 24 * 3600 * 1000;
            break;
        case TimeUnit.Hour:
            t = time * 3600 * 1000;
            break;
        case TimeUnit.Minute:
            t = time * 60 * 1000;
            break;
        case TimeUnit.Second:
            t = time * 1000;
            break;
        case TimeUnit.Millisecond:
            t = time;
            break;
        default:
            throw new Error('Invalid time unit.');
    }

    return t;
}

export const getTimeFromNow = (duration: TimeDuration) => {
    const now = new Date();

    const { time, unit } = duration;

    if ((unit === TimeUnit.Year || unit === TimeUnit.Month) && time % 1 !== 0) {
        throw new Error('Invalid time delta.');
    }

    let then;

    switch (unit) {
        case TimeUnit.Year:
            then = new Date();
            then.setFullYear(now.getFullYear() + time);
            break;
        case TimeUnit.Month:
            then = new Date();
            then.setMonth(now.getMonth() + time);
            break;
        case TimeUnit.Day:
        case TimeUnit.Hour:
        case TimeUnit.Minute:
        case TimeUnit.Second:
        case TimeUnit.Millisecond:
            then = new Date(now.getTime() + toMs(duration));
            break;
    }

    if (!then) {
        throw new Error('Cannot compute time from now.');
    }

    return then;
}