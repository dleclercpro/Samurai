import Session from '../helpers/Session';
import { IUser } from '../models/User';

declare global {
    namespace Express {
        interface Request {
            session: Session,
            user: IUser,
        }
    }
}