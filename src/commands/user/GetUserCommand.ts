import { ErrorUserDoesNotExist } from '../../errors/UserErrors';
import Command from '../Command';
import UserModel, { IUser } from '../../models/auth/User';

interface Argument {
    email: string,
}

type Response = IUser;

class GetUserCommand extends Command<Argument, Response> {

    public constructor(argument: Argument) {
        super('GetUserCommand', argument);
    }

    protected async doExecute() {
        const { email } = this.argument;

        // Try and find user in database
        const user = await UserModel.getByEmail(email);

        // User should exist in database
        if (!user) {
            throw new ErrorUserDoesNotExist(email);
        }
        
        return user;
    }
}

export default GetUserCommand;