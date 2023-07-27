import { FETCH_DEFAULT_TIMEOUT } from '../../config';
import { log } from '../../logger';
import fetchWithTimeout from './Fetch';
import getCookie from './Cookie';

class Call {
    private name: string;
    private url: string;
    private method: string;
    private timeout: number;
    private payload: object | undefined;
    private headers: HeadersInit;
    private params: RequestInit;

    constructor(name: string, url: string, method: string, payload?: object, timeout?: number) {
        this.name = name;
        this.url = url;
        this.method = method;
        this.payload = payload;
        this.timeout = timeout !== undefined ? timeout : FETCH_DEFAULT_TIMEOUT;
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
        this.headers = {
            'X-CSRFToken': getCookie('csrftoken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    }

    prepare() {
        this.prepareHeaders();

        this.params = {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.payload),
            credentials: 'include',
        };
    }

    async execute() {
        log(`Executing call: ${this.name}`);

        this.prepare();

        // Try reading server data, otherwise just reject with status text
        try {
            const response: Response = await fetchWithTimeout(this.url, this.params, this.timeout);

            const json = await response.json();
            const { code, error } = json;

            const isApiResponse = code !== undefined;
    
            // Everything went fine
            if (isApiResponse && code >= 0) {
                return json;
            }
            if (!isApiResponse && response.status === 200) {
                return json;
            }
    
            // Something went wrong, but we let the processing happen further down the line
            return Promise.reject(error);

        } catch (error: any) {
            throw new Error(`[${error.message.toUpperCase()}]`);
        }
    }
}

export default Call;