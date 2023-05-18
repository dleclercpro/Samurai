export interface Cookie {
    name: string,
    value: string,
    properties: Record<any, string>,
}

export const parseCookie = (cookie: string) => {
    return cookie.split('; ').reduce((prev, current) => {
        const [key, value] = current.split('=');

        if (Object.keys(prev).length === 0) {
            return {
                name: key,
                value,
                properties: {},
            };
        }

        return {
            ...prev,
            properties: {
                ...prev.properties,
                [key]: value,
            },
        };
    }, {} as Cookie);
}