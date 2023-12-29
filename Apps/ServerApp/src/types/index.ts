import './RequestTypes'; // Do not remove!

export enum Environment {
    Test = 'test',
    Development = 'development',
    Local = 'local',
    Production = 'production',
}

export interface Auth {
    user: string,
    pass: string,
}

export type IdentityFunction<Arg> = (arg: Arg) => Arg;

export interface FromTo<T> {
    from: T,
    to: T,
}

export interface Comparable {
    compare(other: Comparable): -1 | 0 | 1;
    smallerThan(other: Comparable): boolean;
    smallerThanOrEquals(other: Comparable): boolean;
    equals(other: Comparable): boolean;
    greaterThanOrEquals(other: Comparable): boolean;
    greaterThan(other: Comparable): boolean;
}