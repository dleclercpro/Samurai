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
        const staySignedIn = session.shouldStaySignedIn();
        const expirationDate = session.getExpirationDate();
        
        const sessionString = `
            ${id}|
            ${email}|
            ${staySignedIn}|
            ${expirationDate ? expirationDate.getTime() : ''}
        `;
        
        // Encrypt session string using JWT secret
        if (this.secret) {
            return jwt.sign(sessionString, this.secret);
        }

        return sessionString;
    }

    public deserialize(string: string) {
        let sessionString;

        // Decrypt session token using JWT secret
        if (this.secret) {
            sessionString = jwt.verify(string, this.secret);
        } else {
            sessionString = string;
        }

        const [ id, email, _staySignedIn, _expirationDate ] = sessionString.split('|');

        const staySignedIn = _staySignedIn === 'true';
        const expirationDate = _expirationDate ? new Date(Number(_expirationDate)) : undefined;

        return new Session(id, email, staySignedIn, expirationDate);
    }
}

export default SessionSerializer;