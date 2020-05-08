import { ThunkActionResult, ThunkDispatchResult } from '../types/ActionTypes';
import { resetGame } from './GameActions';
import { resetPlayers } from './PlayerActions';
import { resetBoard } from './BoardActions';

export const resetApp = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        dispatch(resetGame);
        dispatch(resetPlayers);
        dispatch(resetBoard);

        return Promise.resolve();
    };
}