import { Request, Response, NextFunction } from 'express';
import GetFullHandController from '../../../src/controllers/data/GetFullHandController';
import { FULL_HAND_JSON } from '../../../src/config/GameConfig';
import { logger } from '../../../src/utils/logging';

// Mock the logger to avoid actual logging during tests
jest.mock('../../../src/utils/logging', () => ({
    logger: {
        warn: jest.fn(),
    },
}));

describe('GetFullHandController', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response> & { json: jest.Mock };
    let nextFunction: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn(),
        };
        nextFunction = jest.fn();
    });

    test('should return the full hand JSON data with a success response', async () => {
        await GetFullHandController(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
            code: 0,
            data: FULL_HAND_JSON,
        }));
        expect(nextFunction).not.toHaveBeenCalled();
    });

    test('should call next with an error if an exception occurs', async () => {
        // Simulate an error
        const error = new Error('Test Error');
        mockResponse.json.mockImplementationOnce(() => {
            throw error;
        });

        await GetFullHandController(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(logger.warn).toHaveBeenCalledWith(error.message);
        expect(nextFunction).toHaveBeenCalledWith(error);
    });
});