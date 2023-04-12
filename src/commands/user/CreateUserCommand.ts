import UserModel, { IUser } from '../../models/auth/User';
import Command from '../Command';
import { ErrorUserAlreadyExists } from '../../errors/UserErrors';
import { logger } from '../../utils/Logging';

interface Argument {
    email: string,
    password: string,
}

type Response = IUser;

class CreateUserCommand extends Command<Argument, Response> {

    public constructor(argument: Argument) {
        super('CreateUserCommand', argument);
    }

    protected async doExecute() {
        const { email, password } = this.argument;

        // Try and find user in database
        let user = await UserModel.getByEmail(email);

        // User should not already exist in database
        if (user) {
            throw new ErrorUserAlreadyExists(user);
        }
        
        // Create new user
        user = new UserModel({
            email,
            password: await UserModel.hashPassword(password),
        });

        // Store user in database
        await user.save();

        // Report its creation
        logger.info(`New user created: ${user.getEmail()}`);

        return user;
    }
}

export default CreateUserCommand;