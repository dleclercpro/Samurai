import dotenv from 'dotenv';
import { Environment, IdentityFunction } from '../types';

export const getEnvironment = () => {
    const env = process.env.NODE_ENV || Environment.Development;
    const { error } = dotenv.config({ path: `.env.${env}` });
    
    if (error) {
        throw error;
    }

    return env;
}

export const exists = (x: any) => {
    return x !== undefined;
}

export const unique = (arr: any[]) => [...new Set(arr)];

export const zip = (a: any[], b: any[]) => {
    return a.map((value, i) => [value, b[i]]);
}

export const extractFields = (fields: string[], values: { [key: string]: any }) => {
    const existingFields = Object.keys(values);
    const filteredFields = fields.filter(field => existingFields.includes(field));

    return filteredFields.reduce((filteredValues, field) => {
        return {
            ...filteredValues,
            [field]: values[field],
        };

    }, {});
}

export const flatten = <T> (array: T[][]) => {
    return array.reduce((res, arr) => {
        return [...res, ...arr];
    }, []);
}

export const arrayEquals = <T> (a: T[], b: T[]) => {
    return a.length === b.length && a.every((value, i) => value === b[i]);
}

export const shuffle = <T> (array: T[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const getRandom = <T> (array: T[]) => {
    return array[Math.floor(Math.random() * array.length)];
}

// Build a pipe with functions, to which a given argument can then be passed sequentially
export const pipe = <T> (...fns: IdentityFunction<T>[]) => (arg: T) => {
    return fns.reduce((chain: Promise<T>, fn: IdentityFunction<T>) => chain.then(fn), Promise.resolve(arg));
}

export const deepCopy = (o: object) => JSON.parse(JSON.stringify(o));

export const printJSON = (json: object) => {
    console.log(JSON.stringify(json, null, 2));
}