export const hasLocalStorage = () => {
    return typeof(Storage) !== 'undefined';
}

export const setLocalStorage = (key: string, value: string) => {
    if (hasLocalStorage()) {
        localStorage.setItem(key, value);
    }
}

export const getLocalStorage = (key: string): string => {
    if (hasLocalStorage()) {
        const value = localStorage.getItem(key);

        return value !== null ? value : '';
    }
    
    return '';
}