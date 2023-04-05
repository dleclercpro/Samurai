import * as jwt from 'jsonwebtoken';
import Session from './Session';

class SessionSerializer {
    protected secret?: string;

    public constructor(secret?: string) {
        this.secret = secret;
    }

    public serialize(session: Session) {
        const id = session.getId();
        const email = session.getEmail();
        const staySignedIn = session.hasTouch();
        const expirationDate = session.getExpirationDate();
        
        let string = `
            ${id}|
            ${email}|
            ${staySignedIn}|
            ${expirationDate ? expirationDate.getTime() : ''}
        `;
        
        // Encrypt session string using JWT secret
        if (this.secret) {
            string = jwt.sign(string, this.secret);
        }

        return string;
    }

    public deserialize(session: string) {
        let string;

        // Decrypt session token using JWT secret
        if (this.secret) {
            string = jwt.verify(session, this.secret);
        } else {
            string = session;
        }

        const [ id, email, _staySignedIn, _expirationDate ] = string.split('|');

        const staySignedIn = _staySignedIn === 'true';
        const expirationDate = _expirationDate ? new Date(Number(_expirationDate)) : undefined;

        return new Session(id, email, staySignedIn, expirationDate);
    }
}

export default SessionSerializer;