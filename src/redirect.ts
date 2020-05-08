export const redirectHome = (): Promise<void> => {
    document.location.replace('/');

    return Promise.resolve();
}

export const redirectRules = (): Promise<void> => {
    document.location.replace('/rules/');

    return Promise.resolve();
}

export const redirectGame = (id: number): Promise<void> => {
    document.location.replace(`/game/${id}/`);

    return Promise.resolve();
}