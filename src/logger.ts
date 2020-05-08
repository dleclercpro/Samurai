export const log = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(message);
    }
};

export const warn = (message: string) => {
    if (process.env.NODE_ENV === 'development') {
        console.warn(message);
    }
};