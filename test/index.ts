import { AxiosError } from 'axios';
import { ErrorResponse } from '../src/libs/calls';
import { HttpStatusCode } from '../src/types/HTTPTypes';

interface Error {
    status: HttpStatusCode,
    data: ErrorResponse<any>,
}

const getAxiosErrorData = (err: AxiosError) => ({
    status: err.response?.status,
    data: err.response?.data,
});

export const expectActionToFailWithError = async (action: () => any, error: Error) => {
    const response = action().catch(getAxiosErrorData);

    await expect(response).resolves.toEqual(error);
}