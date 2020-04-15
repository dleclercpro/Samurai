import { getCookie } from "./Cookie";

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
        this.params = {
            ...this.params,
            method: this.method,
            credentials: 'include',
            body: JSON.stringify(this.payload),
            headers: {
                ...this.params.headers,
                'X-CSRFToken': getCookie('csrftoken'),
            },
        };
    }

    execute() {
        this.prepare();

        return fetch(this.url, this.params).then((response: Response) => {
            return response.json();
        }).then((json: any) => {
            const { status, message } = json;

            if (status === 200) {
                return json.data;
            }

            throw new Error(message);
        });
    }
}

export default Call;