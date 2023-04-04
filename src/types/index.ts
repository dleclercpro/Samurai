import './RequestTypes'; // Do not remove!

export enum Environment {
    Development = 'development',
    Production = 'production',
}

export interface Auth {
    user: string,
    pass: string,
}

export type IdentityFunction<Arg> = (arg: Arg) => Arg