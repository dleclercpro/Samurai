import { RequestHandler } from 'express';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { errorResponse, successResponse } from '../../utils/calls';
import SignInCommand from '../../commands/auth/SignInCommand';
import { ErrorUserDoesNotExist, ErrorUserWrongPassword } from '../../errors/UserErrors';
import { ClientError } from '../../errors/ClientErrors';
import { validate } from 'email-validator';
import { ErrorInvalidEmail } from '../../errors/ServerError';
import { SESSION_OPTIONS } from '../../config/AuthConfig';
import { logger } from '../../utils/logging';

export interface SignInControllerBody {
    email: string,
    password: string,
    staySignedIn: boolean,
}

type ISignInController = RequestHandler<any, any, SignInControllerBody>;

const SignInController: ISignInController = async (req, res, next) => {
    try {
        const { cookie } = SESSION_OPTIONS;
        let { email, password, staySignedIn } = req.body;

        // Validate e-mail
        if (!validate(email)) {
            throw new ErrorInvalidEmail(email);
        }
        
        // Try to sign user in
        const { user, session } = await new SignInCommand({ email, password, staySignedIn }).execute();

        // Set cookie with session ID on client's browser
        res.cookie(cookie.name, session.getId(), cookie.options);

        // Success
        return res.json(successResponse({
            username: user.getUsername(),
            email: user.getEmail(),
            isAdmin: user.isAdmin,
        }));

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }

        // Do not tell client why user can't sign in: just say that
        // their credentials are invalid
        if ([ErrorUserDoesNotExist, ErrorInvalidEmail, ErrorUserWrongPassword]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json(errorResponse(ClientError.InvalidCredentials));
        }

        next(err);
    }
}

export default SignInController;