import User, { IUser } from '../../models/User';
import Command from '../Command';
import { ErrorUserAlreadyExists } from '../../errors/UserErrors';
import { logger } from '../../utils/Logging';
import { ErrorInvalidEmail, ErrorInvalidPassword } from '../../errors/ServerError';

interface Argument {
    email: string,
    password: string,
    username: string,
}

type Response = IUser;

class CreateUserCommand extends Command<Argument, Response> {
    private user?: IUser;

    public constructor(argument: Argument) {
        super('CreateUserCommand', argument);
    }

    protected async doPrepare() {
        const { email, password, username } = this.argument;

        // Validate e-mail
        if (!User.isEmailValid(email)) {
            throw new ErrorInvalidEmail(email);
        }

        // Validate password
        if (!User.isPasswordValid(password)) {
            throw new ErrorInvalidPassword();
        }

        // Try and find user in database
        const user = (await User.getByEmail(email)) || (await User.getByUsername(username));

        // User should not already exist in database
        if (user) {
            throw new ErrorUserAlreadyExists(user);
        }
    }

    protected async doExecute() {
        const { email, password, username } = this.argument;

        // Create new user
        const user = new User({
            email,
            password: await User.hashPassword(password),
            username,
        });

        // Store user in database
        await user.save();

        // Report its creation
        logger.info(`New user created: ${user.getEmail()}`);

        // Store user in command
        this.user = user;

        return user;
    }
}

export default CreateUserCommand;