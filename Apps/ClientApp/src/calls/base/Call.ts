import { FETCH_DEFAULT_TIMEOUT } from '../../config';
import { log } from '../../logger';
import fetchWithTimeout from './Fetch';
import getCookie from './Cookie';

/**
 * This is a class that models API calls.
 */
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
        log(`Executing API call: ${this.name}`);

        // Set API call parameters
        this.prepare();

        // Execute API call
        const response = await fetchWithTimeout(this.url, this.params, this.timeout)
            .then(res => res.json())
            .catch(err => err.data);

        // API calls should always return the same JSON data structure:
        // - Code
        // - Data [optional]
        // - Error [optional]
        const { code, error } = response;

        // Everything went fine on the server
        if (code >= 0) {
            return response;
        }

        // Something went wrong, but we let the processing happen further down the line
        console.warn(`Error in call: ${this.name}`);
        return Promise.reject(error ?? 'UNKNOWN_ERROR');
    }
}

export default Call;