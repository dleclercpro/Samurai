import { RequestHandler } from 'express';
import { CASTES } from '../../constants';
import { ErrorInvalidParams } from '../../errors/ServerError';
import { isNumerical } from '../../libs/string';
import { Caste } from '../../types/GameTypes';
import { exists } from '../../libs';

/*
    This validation middleware is responsible for the parameters'
    type validation.
*/
export const PlayGameValidation: RequestHandler = (req, res, next) => {
    const { handTileId, boardTileIds, castes } = req.body;

    const invalidParams = [];
    
    // Validate hand tile
    if (!isNumerical(String(handTileId))) {
        invalidParams.push('handTileId');
    }

    // Validate board tiles
    if (!exists(boardTileIds) || boardTileIds.from !== null && !isNumerical(String(boardTileIds.from))) {
        invalidParams.push('boardTileIds.from');
    }
    if (!exists(boardTileIds) || boardTileIds.to !== null && !isNumerical(String(boardTileIds.to))) {
        invalidParams.push('boardTileIds.to');
    }

    // Validate castes
    if (!exists(castes) || castes.from !== null && !CASTES.includes(String(castes.from) as Caste)) {
        invalidParams.push('castes.from');
    }
    if (!exists(castes) || castes.to !== null && !CASTES.includes(String(castes.to) as Caste)) {
        invalidParams.push('castes.to');
    }

    if (invalidParams.length > 0) {
        throw new ErrorInvalidParams(invalidParams);
    }

    next();
}