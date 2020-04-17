import { CallPlayGame } from '../calls/CallPlayGame';
import { CallGetHand } from '../calls/CallGetHand';
import { loadPlayer, loadOpponents, loadHand } from './PlayerActions';
import { setSuccessDialog, setErrorDialog, openDialog, closeDialog } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { PlayersJSON, HandJSON, BoardJSON } from '../types/JSONTypes';
import { endTurn } from './GameActions';
import { RefreshGame, PlayGame, MoveTile, SwitchCastePieces, SignIn, SignUp, CreateGame } from '../types/ActionTypes';
import { CallGetBoard } from '../calls/CallGetBoard';
import { CallGetPlayers } from '../calls/CallGetPlayers';
import { loadBoard } from './DataActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types/StateTypes';
import { Action } from 'redux';
import { TILE_MOVE_ID, TILE_SWITCH_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/CallSignIn';
import { CallSignUp } from '../calls/CallSignUp';
import { CallCreateGame } from '../calls/CallCreateGame';
import { ServerResponse } from '../types/ServerTypes';

export const signIn = (email: string, password: string): SignIn => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>) => {
        
        return new CallSignIn(email, password).execute()
            .then(() => {
                dispatch(closeDialog(DialogType.SignIn));
                dispatch(setSuccessDialog('You have successfully signed in.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(closeDialog(DialogType.SignIn));
                dispatch(setErrorDialog('There was an error while signing in:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const signUp = (username: string, firstName: string, lastName: string, email: string, password: string): SignUp => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>) => {
        
        return new CallSignUp(username, firstName, lastName, email, password).execute()
            .then(() => {
                dispatch(closeDialog(DialogType.SignUp));
                dispatch(setSuccessDialog('You have successfully signed up.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(closeDialog(DialogType.SignUp));
                dispatch(setErrorDialog('There was an error while signing up:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const createGame = (name: string, self: string, opponents: string[]): CreateGame => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>) => {
        
        return new CallCreateGame(name, self, opponents).execute()
            .then((response: ServerResponse) => {
                const { id } = response.data;

                dispatch(closeDialog(DialogType.CreateGame));
                dispatch(setSuccessDialog(`You have successfully create a new game. Its ID is: ${id}`));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(closeDialog(DialogType.SignUp));
                dispatch(setErrorDialog('There was an error while creating a new game:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const refreshGame = (): RefreshGame => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

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
            });
    }
}

const play = (playerTile: number, boardTileFrom: number, boardTileTo: number, casteFrom: string, casteTo: string): PlayGame => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>, getState: () => AppState) => {
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

export const playTile = (playerTile: number, boardTile: number): PlayGame => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>) => {

        return dispatch(play(playerTile, -1, boardTile, '', ''))
            .catch((error: any) => {
                dispatch(setErrorDialog('Tile placement was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const moveTile = (boardTileFrom: number, boardTileTo: number): MoveTile => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>) => {

        return dispatch(play(TILE_MOVE_ID, boardTileFrom, boardTileTo, '', ''))
            .catch((error: any) => {
                dispatch(setErrorDialog('Tile move was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}

export const switchCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): SwitchCastePieces => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>) => {

        return dispatch(play(TILE_SWITCH_ID, boardTileFrom, boardTileTo, casteFrom, casteTo))
            .catch((error: any) => {
                dispatch(setErrorDialog('Caste pieces switch was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    }
}