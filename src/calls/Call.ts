import { getCookie } from './Cookie';

export const BASE_URL = 'http://35.182.135.40/';

class Call {
    private url: string;
    private method: string;
    private payload: object | undefined;
    private headers: HeadersInit;
    private params: RequestInit;

    constructor(url: string, method: string, payload?: object) {
        this.url = BASE_URL + url;
        this.method = method;
        this.payload = payload;
        this.headers = {}
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

    getHeaders = () => {
        return this.headers;
    }

    setUrl = (url: string) => {
        this.url = url;
    }

    setMethod = (method: string) => {
        this.method = method;
    }

    setPayload = (payload: object) => {
        this.payload = payload;
    }

    setHeaders = (headers: HeadersInit) => {
        this.headers = headers;
    }

    prepareHeaders() {
        this.setHeaders({
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        });
    }

    prepare() {

        // Headers not set to avoid CORS preflight
        //this.prepareHeaders();

        this.params = {
            method: this.method,
            body: JSON.stringify(this.payload),
            credentials: 'include',
        };
    }

    execute() {
        this.prepare();

        return fetch(this.url, this.params).then((response: Response) => {

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