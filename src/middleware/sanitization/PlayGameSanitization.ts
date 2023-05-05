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
        ...req.body,
        handTileId: Number(handTileId),
        boardTileIds: {
            from: boardTileIds.from !== null ? Number(boardTileIds.from) : null,
            to: boardTileIds.to !== null ? Number(boardTileIds.to) : null,
        },
        castes: {
            from: castes.from as Caste,
            to: castes.to as Caste,
        },
    };

    next();
}