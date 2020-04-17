import { CallPlayGame } from '../calls/CallPlayGame';
import { CallGetHand } from '../calls/CallGetHand';
import { loadPlayer, loadOpponents, loadHand } from './PlayerActions';
import { setSuccessDialog, setErrorDialog, openDialog, closeDialog } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { PlayersJSON, HandJSON, BoardJSON } from '../types/JSONTypes';
import { endTurn } from './GameActions';
import { RefreshGame, PlayGame, MoveTile, SwitchCastePieces, SignIn } from '../types/ActionTypes';
import { CallGetBoard } from '../calls/CallGetBoard';
import { CallGetPlayers } from '../calls/CallGetPlayers';
import { loadBoard } from './DataActions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../types/StateTypes';
import { Action } from 'redux';
import { TILE_MOVE_ID, TILE_SWITCH_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/CallSignIn';

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

export const refreshGame = (): RefreshGame => {

    return (dispatch: ThunkDispatch<AppState, Promise<void>, Action>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

        return new CallGetBoard(game.id).execute()
            .then((board: BoardJSON) => {
                dispatch(loadBoard(board));

                return new CallGetPlayers(game.id).execute();    
            })
            .then((players: PlayersJSON) => {
                dispatch(loadPlayer(players.self));
                dispatch(loadOpponents(players.opponents));

                return new CallGetHand(game.id).execute();
            })
            .then((hand: HandJSON) => {
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