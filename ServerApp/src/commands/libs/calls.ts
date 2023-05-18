export interface SuccessResponse<Data> {
    code: number,
    data?: Data,
}

export interface ErrorResponse<Data> {
    code: number,
    error: string,
    data?: Data,
}



/**
 * Generate a successful response for the client app
 * @param data 
 * @param code 
 * @returns 
 */
export const successResponse = <Data> (data?: Data, code: number = 0): SuccessResponse<Data> => ({
    code,
    data,
});



/**
 * Generate an error response for the client app
 * @param data 
 * @param code 
 * @returns 
 */
export const errorResponse = <Data> (error: string, data?: Data, code: number = -1): ErrorResponse<Data> => ({
    code,
    error,
    data,
});