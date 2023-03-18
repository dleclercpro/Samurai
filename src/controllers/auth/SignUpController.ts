import { validate } from 'email-validator';
import { RequestHandler } from 'express';
import CreateUserCommand from '../../commands/user/CreateUserCommand';
import { ClientError } from '../../errors/ClientErrors';
import { ErrorInvalidEmail, ErrorInvalidParams, ErrorInvalidPassword } from '../../errors/ServerError';
import { ErrorUserAlreadyExists } from '../../errors/UserErrors';
import { errorResponse, successResponse } from '../../libs/calls';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';
import { validatePassword } from '../../utils/Validation';

const SignUpController: RequestHandler = async (req, res, next) => {    
    try {
        let { email, password } = req.body;

        // Test params
        if (!email || !password) {
            throw new ErrorInvalidParams();
        }

        // Sanitize input
        email = email.trim().toLowerCase();

        // Validate e-mail
        if (!validate(email)) {
            throw new ErrorInvalidEmail(email);
        }

        // Validate password
        if (!validatePassword(password)) {
            throw new ErrorInvalidPassword();
        }
        
        // Create new user in database
        await new CreateUserCommand({ email, password }).execute();

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

        // User already exists
        if (err.code === ErrorUserAlreadyExists.code) {
            return res
                .status(HttpStatusCode.FORBIDDEN)
                .json(errorResponse(ClientError.UserAlreadyExists));
        }

        // Invalid email
        if (err.code === ErrorInvalidEmail.code) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidEmail));
        }

        // Invalid password
        if (err.code === ErrorInvalidPassword.code) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidPassword));
        }

        next(err);
    }
}

export default SignUpController;