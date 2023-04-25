import './RequestTypes'; // Do not remove!

export enum Environment {
    Test = 'test',
    Development = 'development',
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