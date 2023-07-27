export const notUndefined = <T>(x: T | undefined): x is T => {
    return x !== undefined;
}

export const notNull = <T>(x: T | null): x is T => {
    return x !== null;
}