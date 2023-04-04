import { IUser } from '../../models/User';
import Session from '../../models/Session';
import Command from '../Command';
import GetUserCommand from '../user/GetUserCommand';
import { SESSION_OPTIONS } from '../../config/AuthConfig';

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

    public constructor(argument: Argument) {
        super('SignInCommand', argument);
    }

    protected async doExecute() {
        const { email, password, staySignedIn } = this.argument;
        const { duration } = SESSION_OPTIONS;

        // Try and find user in database
        const user = await new GetUserCommand({ email }).execute();

        // Authenticate user
        await user.authenticate(password);

        // Create session for user
        const session = await Session.create(user.getEmail(), staySignedIn, duration);

        return { user, session };
    }
}

export default SignInCommand;