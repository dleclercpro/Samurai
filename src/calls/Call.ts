import { getCookie } from './Cookie';

export const BASE_URL = 'http://127.0.0.1:8000/';

class Call {
    private url: string;
    private method: string;
    private payload: object | undefined;
    private params: RequestInit;

    constructor(url: string, method: string, payload?: object) {
        this.url = BASE_URL + url;
        this.method = method;
        this.payload = payload;
        this.params = {};
    }

    getUrl(): string {
        return this.url;
    }

    getMethod(): string {
        return this.method;
    }

    getPayload(): object | undefined {
        return this.payload;
    }

    setUrl(url: string) {
        this.url = url;
    }

    setMethod(method: string) {
        this.method = method;
    }

    setPayload(payload: object) {
        this.payload = payload;
    }

    prepare() {
        const sessionId = getCookie('sessionid');
        const csrfToken = getCookie('csrftoken');

        console.log(sessionId, csrfToken);

        this.params = {
            method: this.method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cookie': `sessionid=${sessionId}; csrftoken=${csrfToken}`,
            },
            credentials: 'include',
            body: JSON.stringify(this.payload),
        };
    }

    execute() {
        this.prepare();

        return fetch(this.url, this.params).then((response: Response) => {
            console.log(response.headers.get('Set-Cookie'));

            // Raw server response
            if (response.ok) {
                return response.json();
            }

            throw new Error(response.statusText);
        
        }).then((json: any) => {
            const { status } = json;

            // User-defined server response
            if (status === 200) {
                return json;
            }

            return Promise.reject(json);
        
        }).catch((error: any) => {
            const { message } = error;
            
            // Raw server call crashed
            if (error.status === undefined) {
                throw new Error(`[${message.toUpperCase()}]`);
            }
            
            // Re-throw user-defined error for further processing
            return Promise.reject(error);
        });
    }
}

export default Call;