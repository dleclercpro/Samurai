import { RequestHandler } from 'express';
import CreateUserCommand from '../../commands/user/CreateUserCommand';
import { ClientError } from '../../errors/ClientErrors';
import { ErrorInvalidEmail, ErrorInvalidPassword } from '../../errors/ServerError';
import { ErrorUserAlreadyExists } from '../../errors/UserErrors';
import { errorResponse, successResponse } from '../../utils/calls';
import { HttpStatusCode } from '../../types/HTTPTypes';
import { logger } from '../../utils/logging';

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

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }

        // User already exists
        if ([ErrorUserAlreadyExists]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.FORBIDDEN)
                .json(errorResponse(ClientError.UserAlreadyExists));
        }

        // Invalid email
        if ([ErrorInvalidEmail]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidEmail));
        }

        // Invalid password
        if ([ErrorInvalidPassword]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.BAD_REQUEST)
                .json(errorResponse(ClientError.InvalidPassword));
        }

        next(err);
    }
}

export default SignUpController;