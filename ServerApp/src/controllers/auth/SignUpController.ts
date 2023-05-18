import { RequestHandler } from 'express';
import CreateUserCommand from '../../commands/user/CreateUserCommand';
import { ClientError } from '../../errors/ClientErrors';
import { ErrorInvalidEmail, ErrorInvalidPassword } from '../../errors/ServerError';
import { ErrorUserAlreadyExists } from '../../errors/UserErrors';
import { errorResponse, successResponse } from '../../libs/calls';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { logger } from '../../utils/Logging';

export interface SignUpControllerBody {
    email: string,
    password: string,
    username: string,
}

type ISignUpController = RequestHandler<any, any, SignUpControllerBody>;

const SignUpController: ISignUpController = async (req, res, next) => {
    try {
        let { email, password, username } = req.body;

        // Create new user in database
        const user = await new CreateUserCommand({ email, password, username }).execute();

        // Success
        return res.json(successResponse({
            id: user.getId(),
        }));

    } catch (err: any) {

        // User already exists
        if (err.code === ErrorUserAlreadyExists.code) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.FORBIDDEN)
                .json(errorResponse(ClientError.UserAlreadyExists));
        }

        // Invalid email
        if (err.code === ErrorInvalidEmail.code) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidEmail));
        }

        // Invalid password
        if (err.code === ErrorInvalidPassword.code) {
            logger.warn(err.message);

            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidPassword));
        }

        next(err);
    }
}

export default SignUpController;