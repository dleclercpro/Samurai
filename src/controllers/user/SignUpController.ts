import { RequestHandler } from 'express';
import Connection from '../../models/Connection';
import { HttpStatusCode, HttpStatusMessage } from '../../types/HTTPTypes';

const SignUpController: RequestHandler = async (req, res) => {
    try {

        // Success
        return res.json(Connection.success());

    } catch (err: any) {

        // Unknown error
        return res
            .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
            .send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
    }
}

export default SignUpController;