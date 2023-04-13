import { RequestHandler } from 'express';
import CreateUserCommand from '../../commands/user/CreateUserCommand';
import { ClientError } from '../../errors/ClientErrors';
import { ErrorInvalidEmail, ErrorInvalidParams, ErrorInvalidPassword } from '../../errors/ServerError';
import { ErrorUserAlreadyExists } from '../../errors/UserErrors';
import { errorResponse, successResponse } from '../../libs/calls';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';

const SignUpController: RequestHandler = async (req, res, next) => {    
    try {
        let { email, password } = req.body;

        // Test params
        if (!email || !password) {
            throw new ErrorInvalidParams();
        }

        // Sanitize input
        email = email.trim().toLowerCase();
        
        // Create new user in database
        await new CreateUserCommand({ email, password }).execute();

        // Success
        return res.json(successResponse());

    } catch (err: any) {
        logger.warn(err.message);

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