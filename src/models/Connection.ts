import { logger } from '../utils/Logging';

interface ConnectionResponse {
    code: number,
    message?: string,
    data?: object,
}

class Connection {

    private static response(code: number, message = '', data = {}): ConnectionResponse {
        return {
            code,
            message,
            data,
        };
    }

    public static success(data = {}, message = 'Success', code: number = 0): ConnectionResponse {
        return Connection.response(code, message, data)
    }

    public static error(data = {}, message = 'Error', code: number = -1): ConnectionResponse {
        logger.error(message)

        return Connection.response(code, message, data)
    }
}

export default Connection;