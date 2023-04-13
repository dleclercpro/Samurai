import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import Session from '../../models/auth/Session';
import User, { IUser } from '../../models/auth/User';
import { logger } from '../../utils/Logging';
import Command from '../Command';

interface Argument {
    session: Session,
}

class SignOutCommand extends Command<Argument> {
    private user?: IUser;

    public constructor(argument: Argument) {
        super('SignOutCommand', argument);
    }

    protected async doPrepare() {
        const { session } = this.argument;

        // User is authenticated: let's grab them in database
        const user = await User.getByEmail(session.getEmail());

        // The user should exist, otherwise they couldn't have signed in
        if (!user) {
            throw new ErrorUserDoesNotExist(session.getEmail());
        }

        // Store user in command
        this.user = user;
    }

    protected async doExecute() {
        const { session } = this.argument;

        // Destroy user session
        await session.delete();

        logger.info(`User signed out: ${this.user!.stringify()}`);
    }
}

export default SignOutCommand;