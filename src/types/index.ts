import './RequestTypes'; // Do not remove!

export enum Environment {
    Development = 'development',
    Production = 'production',
}

export interface Session {
    id: string,
    email: string,
    expireAt: Date,
}