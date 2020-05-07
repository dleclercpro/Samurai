import { CallPlayGame } from '../calls/CallPlayGame';
import { openDialog, setDialogText, setDialogAction } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { UserJSON, GameData } from '../types/ServerTypes';
import { endTurn, resetGameId, setGameVersion, resetGameVersion, setPlayedTilesSinceLastTurn } from './GameActions';
import { ThunkDispatchResult, ThunkActionResult } from '../types/ActionTypes';
import { setBoard } from './DataActions';
import { AppState } from '../types/StateTypes';
import { TILE_MOVE_ID, TILE_SWAP_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/CallSignIn';
import { CallSignUp } from '../calls/CallSignUp';
import { CallCreateGame } from '../calls/CallCreateGame';
import { ServerResponse } from '../types/ServerTypes';
import { setPlayer, setOpponents, setHand } from './PlayerActions';
import { resetUser, setUser } from './UserActions';
import { CallSignOut } from '../calls/CallSignOut';
import { CallVerifyAuthentication } from '../calls/CallVerifyAuthentication';
import { isGameOver, isCurrentPlayer } from '../selectors';
import { redirectHome, redirectGame } from '../lib';
import { CallGetData } from '../calls/CallGetData';

export const verifyAuthentication = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return new CallVerifyAuthentication().execute()
            .then((response: ServerResponse<UserJSON>) => {
                const { username, email } = response.data;
                
                dispatch(setUser(username, email));
            })
            .catch(() => {
                dispatch(resetUser);
                dispatch(resetGameId);
            });
    };
}

export const signIn = (identifier: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;
        
        return new CallSignIn(identifier, password).execute()
            .then((response: ServerResponse<UserJSON>) => {
                const { username, email } = response.data;
                
                dispatch(setUser(username, email));

                dispatch(setDialogText(DialogType.Success, language.getText('SIGN_IN_SUCCESS')));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('SIGN_IN_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));

                throw new Error(error.message);
            });
    };
}

export const signOut = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;
        
        return new CallSignOut().execute()
            .then(() => {                
                dispatch(setDialogText(DialogType.Success, language.getText('SIGN_OUT_SUCCESS')));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('SIGN_OUT_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));
            })
            .finally(() => {
                dispatch(resetUser);
                dispatch(resetGameId);
            });
    };
}

export const signUp = (username: string, firstName: string, lastName: string, email: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;
        
        return new CallSignUp(username, firstName, lastName, email, password).execute()
            .then(() => {
                dispatch(setDialogText(DialogType.Success, language.getText('SIGN_UP_SUCCESS')));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('SIGN_UP_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));

                throw new Error(error.message);
            });
    };
}

export const createGame = (name: string, self: string, opponents: string[]): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;

        dispatch(resetGameId);
        
        return new CallCreateGame(name, self, opponents).execute()
            .then((response: ServerResponse<{ id: number }>) => {
                const { id } = response.data;

                dispatch(setDialogText(DialogType.Success, language.getText('CREATE_GAME_SUCCESS', { id: id })));
                dispatch(setDialogAction(DialogType.Success, () => redirectGame(id)));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('CREATE_GAME_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const getData = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        let state = getState();
        const { game } = state;
        const { language } = state.user;

        return new CallGetData(game.id, game.version).execute()
            .then((response: ServerResponse<GameData>) => {
                const { version } = response.data;

                // No new data on server
                if (version === undefined || version <= game.version) {
                    return;
                }

                const { hand, board, players, lastPlayedTiles } = response.data;
                const wasPlaying = isCurrentPlayer(state.players);

                // Load everything
                dispatch(setGameVersion(version));
                dispatch(setBoard(board));
                dispatch(setPlayer(players.self));
                dispatch(setOpponents(players.opponents));
                dispatch(setHand(hand));
                dispatch(setPlayedTilesSinceLastTurn(lastPlayedTiles));

                // Re-pull state
                state = getState();
                const isPlaying = isCurrentPlayer(state.players);

                // Game ended?
                if (isGameOver(state.players)) {
                    dispatch(openDialog(DialogType.GameOver));
                    return;
                }

                // New turn for player
                if (!wasPlaying && isPlaying) {
                    dispatch(openDialog(DialogType.NewTurn));
                }
            })
            .catch((error: any) => {
                dispatch(resetGameVersion);

                dispatch(setDialogText(DialogType.Error, language.getText('GET_DATA_ERROR', { id: game.id }), error.message));
                dispatch(setDialogAction(DialogType.Error, redirectHome));
                dispatch(openDialog(DialogType.Error));

                return Promise.reject();
            });
    };
}

const play = (handTile: number, boardTileFrom: number, boardTileTo: number, casteFrom: string, casteTo: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

        return new CallPlayGame(game.id, handTile, boardTileFrom, boardTileTo, casteFrom, casteTo).execute()
            .then(() => {
                return dispatch(getData());
            })
            .finally(() => {
                dispatch(endTurn);
            });
    };
}

export const playTile = (handTile: number, boardTile: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;

        return dispatch(play(handTile, -1, boardTile, '', ''))
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('PLAY_TILE_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const moveTile = (boardTileFrom: number, boardTileTo: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;

        return dispatch(play(TILE_MOVE_ID, boardTileFrom, boardTileTo, '', ''))
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('MOVE_TILE_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const swapCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.user;

        return dispatch(play(TILE_SWAP_ID, boardTileFrom, boardTileTo, casteFrom, casteTo))
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('CASTE_SWAP_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}