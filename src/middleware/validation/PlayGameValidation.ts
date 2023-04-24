import { RequestHandler } from 'express';
import { CASTES } from '../../constants';
import { ErrorInvalidParams } from '../../errors/ServerError';
import { isNumerical } from '../../libs/string';

/*
    This validation middleware is responsible for the parameters'
    type validation.
*/
export const PlayGameValidation: RequestHandler = (req, res, next) => {
    const { handTileId, boardTileIds, castes } = req.body;

    const invalidParams = [];

    // Validate hand tile
    !isNumerical(handTileId) && invalidParams.push('handTileId');

    // Validate board tiles
    boardTileIds.from !== null && !isNumerical(boardTileIds.from) && invalidParams.push('boardTileIds.from');
    boardTileIds.to !== null && !isNumerical(boardTileIds.to) && invalidParams.push('boardTileIds.to');

    // Validate castes
    castes.from !== null && !CASTES.includes(castes.from) && invalidParams.push('castes.from')
    castes.to !== null && !CASTES.includes(castes.to) && invalidParams.push('castes.to')

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }
    
    next();
}