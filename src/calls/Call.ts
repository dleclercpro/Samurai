import { BASE_URL, FETCH_DEFAULT_TIMEOUT } from '../config';
import { log } from '../logger';
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
        this.url = BASE_URL + url;
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
        log(`Executing call: ${this.name}`);

        this.prepare();

        return fetchWithTimeout(this.url, this.params, this.timeout).then((response: Response) => {

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