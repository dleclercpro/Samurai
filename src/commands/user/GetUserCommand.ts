import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import Command from '../Command';
import User, { IUser } from '../../models/auth/User';

interface Argument {
    email: string,
}

type Response = IUser;

class GetUserCommand extends Command<Argument, Response> {
    private user?: IUser;

    public constructor(argument: Argument) {
        super('GetUserCommand', argument);
    }

    protected async doPrepare() {
        const { email } = this.argument;

        // Try and find user in database
        const user = await User.getByEmail(email);

        // User should exist in database
        if (!user) {
            throw new ErrorUserDoesNotExist(email);
        }

        // Store user in command
        this.user = user;
    }

    protected async doExecute() {
        return this.user!;
    }
}

export default GetUserCommand;