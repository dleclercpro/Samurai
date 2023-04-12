import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import Session from '../../models/auth/Session';
import UserModel from '../../models/auth/User';
import Command from '../Command';

interface Argument {
    session: Session,
}

class SignOutCommand extends Command<Argument> {

    public constructor(argument: Argument) {
        super('SignOutCommand', argument);
    }

    protected async doExecute() {
        const { session } = this.argument;

        // User is authenticated: let's grab them in database
        const user = await UserModel.getByEmail(session.getEmail());

        // The user should exist, otherwise they couldn't have signed in
        if (!user) {
            throw new ErrorUserDoesNotExist(session.getEmail());
        }

        // Destroy user session
        await session.delete();
    }
}

export default SignOutCommand;