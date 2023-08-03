import { IUser } from '../../models/User';
import Session from '../../helpers/Session';
import Command from '../Command';
import GetUserCommand from '../user/GetUserCommand';
import { SESSION_OPTIONS } from '../../config/AuthConfig';
import { logger } from '../../utils/logging';

interface Argument {
    email: string,
    password: string,
    staySignedIn: boolean,
}

interface Response {
    user: IUser,
    session: Session,
}

class SignInCommand extends Command<Argument, Response> {
    private user?: IUser;

    public constructor(argument: Argument) {
        super('SignInCommand', argument);
    }

    protected async doPrepare() {
        const { email, password } = this.argument;

        // Try and find user in database
        const user = await new GetUserCommand({ email }).execute();

        // Authenticate user
        await user.authenticate(password);

        // Store user in command
        this.user = user;
    }

    protected async doExecute() {
        const { staySignedIn } = this.argument;
        const { duration } = SESSION_OPTIONS;
        const user = this.user!;

        // Create session for user
        const session = await Session.create(user.getEmail(), user.getUsername(), staySignedIn, duration);

        logger.info(`User signed in: ${user.stringify()}`);

        return { user, session };
    }
}

export default SignInCommand;