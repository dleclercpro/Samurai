import Session from '../models/auth/Session';
import { IUser } from '../models/auth/User';

declare global {
    namespace Express {
        interface Request {
            session: Session,
            user: IUser,
        }
    }
}