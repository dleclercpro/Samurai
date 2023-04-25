import { RequestHandler } from 'express';
import { Caste } from '../../types/GameTypes';

/*
    This validation middleware is responsible for the parameters'
    type sanitization.
*/
export const PlayGameSanitization: RequestHandler = (req, res, next) => {
    const { handTileId, boardTileIds, castes } = req.body;
    
    // Sanitize body types
    req.body = {
        handTileId: Number(handTileId),
        boardTileIds: {
            from: Number(boardTileIds.from),
            to: Number(boardTileIds.to),
        },
        castes: {
            from: castes.from as Caste,
            to: castes.to as Caste,
        },
    };

    next();
}