import { RequestHandler } from 'express';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { errorResponse, successResponse } from '../../libs/calls';
import SignInCommand from '../../commands/auth/SignInCommand';
import { ErrorUserDoesNotExist, ErrorUserWrongPassword } from '../../errors/UserErrors';
import { ClientError } from '../../errors/ClientErrors';
import { validate } from 'email-validator';
import { ErrorInvalidEmail, ErrorInvalidParams } from '../../errors/ServerError';
import { logger } from '../../utils/Logging';
import { SESSION_OPTIONS } from '../../config/AuthConfig';

const SignInController: RequestHandler = async (req, res, next) => {
    try {
        const { cookie } = SESSION_OPTIONS;
        let { email, password, staySignedIn } = req.body;

        // Test params
        if (!email || !password || !staySignedIn) {
            throw new ErrorInvalidParams();
        }

        // Sanitize input
        email = email.trim().toLowerCase();

        // Validate e-mail
        if (!validate(email)) {
            throw new ErrorInvalidEmail(email);
        }
        
        // Try to sign user in
        const { session } = await new SignInCommand({ email, password, staySignedIn }).execute();

        // Set cookie with session ID on client's browser
        res.cookie(cookie.name, session.getId(), cookie.options);

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        logger.warn(err.message);

        // Invalid parameters provided
        if (err.code === ErrorInvalidParams.code) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .send(HttpStatusMessage.BAD_REQUEST)
        }

        // Do not tell client why user can't sign in: just say that
        // their credentials are invalid
        if (err.code === ErrorUserDoesNotExist.code ||
            err.code === ErrorInvalidEmail.code ||
            err.code === ErrorUserWrongPassword.code
        ) {
            return res
                .status(HttpStatusCode.FORBIDDEN)
                .json(errorResponse(ClientError.InvalidCredentials));
        }

        next(err);
    }
}

export default SignInController;