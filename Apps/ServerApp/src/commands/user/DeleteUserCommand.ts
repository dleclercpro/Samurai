import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import User, { IUser } from '../../models/User';
import Command from '../Command';

interface Argument {
    email: string,
}

class DeleteUserCommand extends Command<Argument> {
    private user?: IUser;

    public constructor(argument: Argument) {
        super('DeleteUserCommand', argument);
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

        // Remove user from database
        await this.user!.deleteOne();
    }
}

export default DeleteUserCommand;