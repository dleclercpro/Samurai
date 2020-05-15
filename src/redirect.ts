export const redirectHome = (): Promise<void> => {
    document.location.assign('/');

    return Promise.resolve();
}

export const redirectRules = (): Promise<void> => {
    document.location.assign('/rules/');

    return Promise.resolve();
}

export const redirectGame = (id: number): Promise<void> => {
    document.location.assign(`/game/${id}/`);

    return Promise.resolve();
}