import { SESSION_OPTIONS } from '../config/AuthConfig';
import { MemoryDatabase } from '../databases/base/MemoryDatabase';

/*
    This class is responsible for handling the cookies when testing the
    application. It is a singleton.
*/
class CookieManager {
    private db: MemoryDatabase<string>;
    private static instance: CookieManager;

    private constructor() {
        this.db = new MemoryDatabase();
    }

    public static getInstance() {
        if (!this.instance) {
            this.instance = new CookieManager();
        }

        return this.instance;
    }

    // PRIVATE METHODS
    private async getCookie(name: string) {
        return this.db.get(name);
    }

    private async setCookie(name: string, cookie: string) {
        return this.db.set(name, cookie);
    }

    private async removeCookie(name: string) {
        return this.db.delete(name);
    }

    // PUBLIC METHODS
    public async getSessionCookie() {
        return this.getCookie(SESSION_OPTIONS.cookie.name);
    }

    public async setSessionCookie(cookie: string) {
        await this.setCookie(SESSION_OPTIONS.cookie.name, cookie);
    }

    public async removeSessionCookie() {
        await this.removeCookie(SESSION_OPTIONS.cookie.name);
    }
}

export default CookieManager.getInstance();