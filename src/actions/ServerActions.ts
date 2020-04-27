import { CallPlayGame } from '../calls/CallPlayGame';
import { CallGetHand } from '../calls/CallGetHand';
import { setSuccessDialog, setErrorDialog, openDialog } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { PlayersJSON, HandJSON, BoardJSON, UserJSON } from '../types/ServerTypes';
import { endTurn, setGameId } from './GameActions';
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
import { loadPlayer, loadOpponents, loadHand } from './PlayerActions';
import { signOut, signIn } from './UserActions';
import { CallSignOut } from '../calls/CallSignOut';

export const login = (email: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallSignIn(email, password).execute()
            .then((response: ServerResponse) => {
                const user: UserJSON = response.data;
                
                dispatch(signIn(user.username, user.email));

                dispatch(setSuccessDialog('You have successfully signed in.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while signing in:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const logout = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallSignOut().execute()
            .then(() => {
                dispatch(signOut);
                
                dispatch(setSuccessDialog('You have successfully signed out.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while signing out:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
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
    };
}

export const createGame = (name: string, self: string, opponents: string[]): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallCreateGame(name, self, opponents).execute()
            .then((response: ServerResponse) => {
                const id: number = response.data.id;

                return dispatch(refreshGame(id));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while creating a new game:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const refreshGame = (id: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        dispatch(setGameId(id));

        let board: BoardJSON;
        let players: PlayersJSON;
        let hand: HandJSON;

        return new CallGetBoard(id).execute()
            .then((response: ServerResponse) => {
                board = response.data;

                return new CallGetPlayers(id).execute();    
            })
            .then((response: ServerResponse) => {
                players = response.data;

                return new CallGetHand(id).execute();
            })
            .then((response: ServerResponse) => {
                hand = response.data;

                return;
            })
            .then(() => {

                // Loaded everything
                dispatch(loadBoard(board));
                dispatch(loadPlayer(players.self));
                dispatch(loadOpponents(players.opponents));
                dispatch(loadHand(hand));
            })
            .catch((error: any) => {
                dispatch(setGameId(-1));

                dispatch(setErrorDialog(`There was a problem loading the game with ID: ${id}`, error.message));
                dispatch(openDialog(DialogType.Error));

                return Promise.reject();
            });
    };
}

const play = (playerTile: number, boardTileFrom: number, boardTileTo: number, casteFrom: string, casteTo: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

        return new CallPlayGame(game.id, playerTile, boardTileFrom, boardTileTo, casteFrom, casteTo).execute()
            .then(() => {
                return dispatch(refreshGame(game.id));
            }).finally(() => {
                dispatch(endTurn);
            });
    };
}

export const playTile = (playerTile: number, boardTile: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(playerTile, -1, boardTile, '', ''))
            .catch((error: any) => {
                dispatch(setErrorDialog('Tile placement was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const moveTile = (boardTileFrom: number, boardTileTo: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(TILE_MOVE_ID, boardTileFrom, boardTileTo, '', ''))
            .catch((error: any) => {
                dispatch(setErrorDialog('Tile move was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const switchCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(TILE_SWITCH_ID, boardTileFrom, boardTileTo, casteFrom, casteTo))
            .catch((error: any) => {
                dispatch(setErrorDialog('Caste pieces switch was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}