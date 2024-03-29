import { CallPlayGame } from '../calls/game/CallPlayGame';
import { openDialog, setDialogText, setDialogAction } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { UserData, GameData, FullHandData } from '../types/DataTypes';
import { endTurn, setGameVersion, setPlayedTilesSinceLastTurn, setGameName, resetGame } from './GameActions';
import { AppThunkDispatch, AppThunkAction } from '../types/ActionTypes';
import { resetBoard, setBoard } from './BoardActions';
import { AppState } from '../types/StateTypes';
import { TILE_MOVE_ID, TILE_SWAP_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/auth/CallSignIn';
import { CallSignUp } from '../calls/auth/CallSignUp';
import { CallCreateGame } from '../calls/game/CallCreateGame';
import { ServerResponse } from '../types/DataTypes';
import { setSelf, setOpponents, resetPlayers } from './PlayerActions';
import { resetUser, setUser } from './UserActions';
import { CallSignOut } from '../calls/auth/CallSignOut';
import { CallPing } from '../calls/auth/CallPing';
import { isGameOver, isCurrentPlayer } from '../selectors';
import { CallGetGameData } from '../calls/game/CallGetGameData';
import { resetOwnHand, setFullHand, setOwnHand } from './HandActions';
import { CallGetFullHand } from '../calls/data/CallGetFullHand';

export const verifyAuthentication = (): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>) => {

        return new CallPing().execute()
            .then((response: ServerResponse<UserData>) => {
                const { username, email, isAdmin } = response.data;
                
                dispatch(setUser(username, email, isAdmin));
            })
            .catch(() => {
                dispatch(resetUser);
            });
    };
}

export const signIn = (email: string, password: string): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;
        
        return new CallSignIn(email, password).execute()
            .then((response: ServerResponse<UserData>) => {
                const { username, email, isAdmin } = response.data;
                
                dispatch(setUser(username, email, isAdmin));

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

export const signOut = (): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
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
                dispatch(resetGame);
                dispatch(resetBoard);
                dispatch(resetPlayers);
                dispatch(resetOwnHand);
            });
    };
}

export const signUp = (username: string, email: string, password: string): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;
        
        return new CallSignUp(username, email, password).execute()
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

export const createGame = (name: string, opponents: string[]): AppThunkAction<void> => {

    const redirectGame = (id: string) => {
        document.location.assign(`/game/${id}/`);

        return Promise.resolve();
    }

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        const state = getState();
        const { language } = state.settings;

        return new CallCreateGame(name, opponents.filter(Boolean)).execute()
            .then((response: ServerResponse<{ id: string }>) => {
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

export const getFullHandData = (): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>) => {

        return new CallGetFullHand().execute()
            .then((response: ServerResponse<FullHandData>) => {
                dispatch(setFullHand(response.data));
            });
    };
}

export const getGameData = (): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        let state = getState();
        const { game } = state;

        return new CallGetGameData(game.id, game.version).execute()
            .then((response: ServerResponse<GameData>) => {

                // No new data on server
                if (response.data === undefined) {
                    return;
                }

                const { name, version, hand, board, players, playedSinceLastTurn } = response.data;
                const wasPlaying = isCurrentPlayer(state.players);

                // Load everything
                dispatch(setGameName(name));
                dispatch(setGameVersion(version));
                dispatch(setOwnHand(hand));
                dispatch(setBoard(board));
                dispatch(setSelf(players.self));
                dispatch(setOpponents(players.opponents));
                dispatch(setPlayedTilesSinceLastTurn(playedSinceLastTurn));

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

const play = (handTile: number, _boardTileFrom: number, _boardTileTo: number, _casteFrom: string, _casteTo: string): AppThunkAction<void> => {

    // Format for server
    const boardTileFrom = _boardTileFrom !== -1 ? _boardTileFrom : null;
    const boardTileTo = _boardTileTo !== -1 ? _boardTileTo : null;
    const casteFrom = _casteFrom !== '' ? _casteFrom : null;
    const casteTo = _casteTo !== '' ? _casteTo : null;

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        const state = getState();
        const { game } = state;

        return new CallPlayGame(game.id, handTile, boardTileFrom, boardTileTo, casteFrom, casteTo).execute()
            .then(() => {
                return dispatch(getGameData());
            })
            .finally(() => {
                dispatch(endTurn);
            });
    };
}

export const playTile = (handTile: number, boardTile: number): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        return dispatch(play(handTile, -1, boardTile, '', ''));
    };
}

export const moveTile = (boardTileFrom: number, boardTileTo: number): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        return dispatch(play(TILE_MOVE_ID, boardTileFrom, boardTileTo, '', ''));
    };
}

export const swapCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): AppThunkAction<void> => {

    return (dispatch: AppThunkDispatch<void>, getState: () => AppState) => {
        return dispatch(play(TILE_SWAP_ID, boardTileFrom, boardTileTo, casteFrom, casteTo));
    };
}