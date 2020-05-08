import { ThunkActionResult, ThunkDispatchResult } from '../types/ActionTypes';
import { resetGame } from './GameActions';
import { resetPlayers } from './PlayerActions';
import { resetBoard } from './BoardActions';
import { setDialogText, setDialogAction, openDialog } from './DialogActions';
import { DialogType } from '../types/DialogTypes';

export const resetApp = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        dispatch(resetGame);
        dispatch(resetPlayers);
        dispatch(resetBoard);

        return Promise.resolve();
    };
}

export const openErrorDialog = (message: string, explanation: string, action: () => Promise<void>): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        dispatch(setDialogText(DialogType.Error, message, explanation));
        dispatch(setDialogAction(DialogType.Error, action));
        dispatch(openDialog(DialogType.Error));

        return Promise.resolve();
    };
};