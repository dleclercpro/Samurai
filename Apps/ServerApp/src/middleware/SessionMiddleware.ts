import { RequestHandler } from 'express';
import { ClientError } from '../errors/ClientErrors';
import { ErrorExpiredSession, ErrorInvalidSessionId, ErrorMissingSessionId } from '../errors/SessionErrors';
import { errorResponse } from '../utils/calls';
import Session from '../helpers/Session';
import { HttpStatusCode, HttpStatusMessage } from '../types/HTTPTypes';
import { TimeUnit } from '../types/TimeTypes';
import { logger } from '../utils/logging';
import { SESSION_OPTIONS } from '../config/AuthConfig';
import GetUserCommand from '../commands/user/GetUserCommand';
import TimeDuration from '../models/units/TimeDuration';

export const SessionMiddleware: RequestHandler = async (req, res, next) => {
    const { cookie } = SESSION_OPTIONS;

    try {

        // Missing session ID
        if (!req.cookies || !req.cookies[cookie.name]) {
            throw new ErrorMissingSessionId();
        }

        const { [cookie.name]: sessionId } = req.cookies;

        // Try to find user session
        const session = await Session.findById(sessionId);

        // Invalid session ID
        if (!session) {
            throw new ErrorInvalidSessionId(sessionId);
        }

        // Is session expired?
        if (session.isExpired()) {

            // Delete session in database
            await session.delete();

            throw new ErrorExpiredSession(sessionId);
        }

        // Extend session duration if desired on every
        // further request
        if (session.hasTouch()) {
            await session.extend(new TimeDuration(1, TimeUnit.Hour));
        }

        // Set session in request for further processing
        req.session = session;

        // Set user in request as well
        req.user = await new GetUserCommand({ email: session.getEmail() }).execute();

        return next();

    } catch (err: unknown) {
        if (err instanceof Error) {
            logger.warn(err.message);
        }

        // Remove session cookie in user's browser
        res.clearCookie(cookie.name);

        if ([ErrorMissingSessionId, ErrorInvalidSessionId, ErrorExpiredSession]
            .some(error => err instanceof error)
        ) {
            return res
                .status(HttpStatusCode.UNAUTHORIZED)
                .json(errorResponse(ClientError.InvalidCredentials));
        }

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}