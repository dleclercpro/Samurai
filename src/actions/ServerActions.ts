import { CallPlayGame } from '../calls/CallPlayGame';
import { CallGetHand } from '../calls/CallGetHand';
import { loadPlayer, loadOpponents, loadHand } from './PlayerActions';
import { setSuccessDialog, setErrorDialog, openDialog } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { PlayersJSON, HandJSON, BoardJSON } from '../types/ServerTypes';
import { endTurn } from './GameActions';
import { ThunkDispatchResult, ThunkActionResult } from '../types/ActionTypes';
import { CallGetBoard } from '../calls/CallGetBoard';
import { CallGetPlayers } from '../calls/CallGetPlayers';
import { loadBoard } from './DataActions';
import { AppState } from '../types/StateTypes';
import { TILE_MOVE_ID, TILE_SWITCH_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/CallSignIn';
import { CallSignUp } from '../calls/CallSignUp';
import { CallCreateGame } from '../calls/CallCreateGame';
import { ServerResponse } from '../types/ServerTypes';
import { openLoadingOverlay, closeLoadingOverlay } from './OverlayActions';

export const signIn = (email: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallSignIn(email, password).execute()
            .then(() => {
                dispatch(setSuccessDialog('You have successfully signed in.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while signing in:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const signUp = (username: string, firstName: string, lastName: string, email: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallSignUp(username, firstName, lastName, email, password).execute()
            .then(() => {
                dispatch(setSuccessDialog('You have successfully signed up.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while signing up:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const createGame = (name: string, self: string, opponents: string[]): ThunkActionResult<number> => {

    return (dispatch: ThunkDispatchResult<number>) => {
        
        return new CallCreateGame(name, self, opponents).execute()
            .then((response: ServerResponse) => {
                const { id } = response.data;

                return id;
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while creating a new game:', error.message));
                dispatch(openDialog(DialogType.Error));

                // Return invalid ID
                return -1;
            });
    }
}

export const refreshGame = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

        dispatch(openLoadingOverlay);

        return new CallGetBoard(game.id).execute()
            .then((response: ServerResponse) => {
                const board: BoardJSON = response.data;

                dispatch(loadBoard(board));

                return new CallGetPlayers(game.id).execute();    
            })
            .then((response: ServerResponse) => {
                const players: PlayersJSON = response.data;

                dispatch(loadPlayer(players.self));
                dispatch(loadOpponents(players.opponents));

                return new CallGetHand(game.id).execute();
            })
            .then((response: ServerResponse) => {
                const hand: HandJSON = response.data;

                dispatch(loadHand(hand));
            }).finally(() => {
                dispatch(closeLoadingOverlay);
            });
    }
}

const play = (playerTile: number, boardTileFrom: number, boardTileTo: number, casteFrom: string, casteTo: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

        return new CallPlayGame(game.id, playerTile, boardTileFrom, boardTileTo, casteFrom, casteTo).execute()
            .then(() => {
                return dispatch(refreshGame());
            }).then(() => {
                dispatch(endTurn);
            });
    }
}

export const playTile = (playerTile: number, boardTile: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(playerTile, -1, boardTile, '', ''))
            .catch((error: any) => {
                dispatch(setErrorDialog('Tile placement was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const moveTile = (boardTileFrom: number, boardTileTo: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(TILE_MOVE_ID, boardTileFrom, boardTileTo, '', ''))
            .catch((error: any) => {
                dispatch(setErrorDialog('Tile move was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const switchCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(TILE_SWITCH_ID, boardTileFrom, boardTileTo, casteFrom, casteTo))
            .catch((error: any) => {
                dispatch(setErrorDialog('Caste pieces switch was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}