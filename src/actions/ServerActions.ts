import { CallPlayGame } from '../calls/CallPlayGame';
import { openDialog, setDialogText, setDialogAction } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { UserJSON, GameData } from '../types/ServerTypes';
import { endTurn, setGameVersion, setPlayedTilesSinceLastTurn, setGameName } from './GameActions';
import { ThunkDispatchResult, ThunkActionResult } from '../types/ActionTypes';
import { setBoard } from './BoardActions';
import { AppState } from '../types/StateTypes';
import { TILE_MOVE_ID, TILE_SWAP_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/CallSignIn';
import { CallSignUp } from '../calls/CallSignUp';
import { CallCreateGame } from '../calls/CallCreateGame';
import { ServerResponse } from '../types/ServerTypes';
import { setSelf, setOpponents } from './PlayerActions';
import { resetUser, setUser } from './UserActions';
import { CallSignOut } from '../calls/CallSignOut';
import { CallVerifyAuthentication } from '../calls/CallVerifyAuthentication';
import { isGameOver, isCurrentPlayer } from '../selectors';
import { CallGetData } from '../calls/CallGetData';
import { redirectGame } from '../redirect';
import { setOwnHand } from './HandActions';

export const verifyAuthentication = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return new CallVerifyAuthentication().execute()
            .then((response: ServerResponse<UserJSON>) => {
                const { username, email } = response.data;
                
                dispatch(setUser(username, email));
            })
            .catch(() => {
                dispatch(resetUser);
            });
    };
}

export const signIn = (identifier: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;
        
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

                return Promise.reject(error);
            });
    };
}

export const signOut = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;
        
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
            });
    };
}

export const signUp = (username: string, firstName: string, lastName: string, email: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;
        
        return new CallSignUp(username, firstName, lastName, email, password).execute()
            .then(() => {
                dispatch(setDialogText(DialogType.Success, language.getText('SIGN_UP_SUCCESS')));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('SIGN_UP_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));

                return Promise.reject(error);
            });
    };
}

export const createGame = (name: string, self: string, opponents: string[]): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;

        return new CallCreateGame(name, self, opponents).execute()
            .then((response: ServerResponse<{ id: number }>) => {
                const { id } = response.data;

                dispatch(setDialogText(DialogType.Success, language.getText('CREATE_GAME_SUCCESS'), language.getText('ID', { id: id })));
                dispatch(setDialogAction(DialogType.Success, () => redirectGame(id)));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setDialogText(DialogType.Error, language.getText('CREATE_GAME_ERROR'), error.message));
                dispatch(openDialog(DialogType.Error));

                return Promise.reject(error);
            });
    };
}

export const getData = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        let state = getState();
        const { game } = state;

        return new CallGetData(game.id, game.version).execute()
            .then((response: ServerResponse<GameData>) => {
                const { version } = response.data;

                // No new data on server
                if (version === undefined || version <= game.version) {
                    return;
                }

                const { name, hand, board, players, lastPlayedTiles } = response.data;
                const wasPlaying = isCurrentPlayer(state.players);

                // Load everything
                dispatch(setGameName(name));
                dispatch(setGameVersion(version));
                dispatch(setOwnHand(hand));
                dispatch(setBoard(board));
                dispatch(setSelf(players.self));
                dispatch(setOpponents(players.opponents));
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
        return dispatch(play(handTile, -1, boardTile, '', ''));
    };
}

export const moveTile = (boardTileFrom: number, boardTileTo: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        return dispatch(play(TILE_MOVE_ID, boardTileFrom, boardTileTo, '', ''));
    };
}

export const swapCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        return dispatch(play(TILE_SWAP_ID, boardTileFrom, boardTileTo, casteFrom, casteTo));
    };
}