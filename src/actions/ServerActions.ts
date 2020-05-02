import { CallPlayGame } from '../calls/CallPlayGame';
import { CallGetHand } from '../calls/CallGetHand';
import { setSuccessDialog, setErrorDialog, openDialog } from './DialogActions';
import { DialogType } from '../types/DialogTypes';
import { PlayersJSON, HandJSON, BoardJSON, UserJSON, PlayedTilesJSON } from '../types/ServerTypes';
import { endTurn, resetGameId } from './GameActions';
import { ThunkDispatchResult, ThunkActionResult } from '../types/ActionTypes';
import { CallGetBoard } from '../calls/CallGetBoard';
import { CallGetPlayers } from '../calls/CallGetPlayers';
import { loadBoard } from './DataActions';
import { AppState } from '../types/StateTypes';
import { TILE_MOVE_ID, TILE_SWAP_ID } from '../constants';
import { Caste } from '../types/GameTypes';
import { CallSignIn } from '../calls/CallSignIn';
import { CallSignUp } from '../calls/CallSignUp';
import { CallCreateGame } from '../calls/CallCreateGame';
import { ServerResponse } from '../types/ServerTypes';
import { loadPlayer, loadOpponents, loadHand, loadPlayedTilesSinceLastTurn } from './PlayerActions';
import { resetUser, setUser } from './UserActions';
import { CallSignOut } from '../calls/CallSignOut';
import { CallVerifyAuthentication } from '../calls/CallVerifyAuthentication';
import { isGameOver, isCurrentPlayer } from '../selectors';
import { redirectHome } from '../lib';
import { CallGetRecentlyPlayed } from '../calls/CallGetRecentlyPlayed';

export const signIn = (email: string, password: string): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallSignIn(email, password).execute()
            .then((response: ServerResponse) => {
                const user: UserJSON = response.data;
                
                dispatch(setUser(user.username, user.email));

                dispatch(setSuccessDialog('You have successfully signed in.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while signing in:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const signOut = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {
        
        return new CallSignOut().execute()
            .then(() => {
                dispatch(resetUser);
                dispatch(resetGameId);
                
                dispatch(setSuccessDialog('You have successfully signed out.'));
                dispatch(openDialog(DialogType.Success));
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while signing out:', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}

export const verifyAuthentication = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return new CallVerifyAuthentication().execute()
            .then((response: ServerResponse) => {
                const user: UserJSON = response.data;
                
                dispatch(setUser(user.username, user.email));
            })
            .catch(() => {
                dispatch(resetUser);
                dispatch(resetGameId);
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

export const createGame = (name: string, self: string, opponents: string[]): ThunkActionResult<number> => {

    return (dispatch: ThunkDispatchResult<number>) => {

        dispatch(resetGameId);
        
        return new CallCreateGame(name, self, opponents).execute()
            .then((response: ServerResponse) => {
                const id: number = response.data.id;

                return id;
            })
            .catch((error: any) => {
                dispatch(setErrorDialog('There was an error while creating a new game:', error.message));
                dispatch(openDialog(DialogType.Error));

                return -1;
            });
    };
}

export const loadGameData = (): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>, getState: () => AppState) => {
        let state = getState();
        const { game } = state;

        let board: BoardJSON;
        let players: PlayersJSON;
        let hand: HandJSON;
        let lastPlayedTiles: PlayedTilesJSON;

        return new CallGetBoard(game.id).execute()
            .then((response: ServerResponse) => {
                board = response.data;

                return new CallGetPlayers(game.id).execute();    
            })
            .then((response: ServerResponse) => {
                players = response.data;

                return new CallGetHand(game.id).execute();
            })
            .then((response: ServerResponse) => {
                hand = response.data;

                return new CallGetRecentlyPlayed(game.id).execute();
            })
            .then((response: ServerResponse) => {
                lastPlayedTiles = response.data;

                return;
            })
            .then(() => {
                const wasPlaying = isCurrentPlayer(state.players);

                // Loaded everything
                dispatch(loadBoard(board));
                dispatch(loadPlayer(players.self));
                dispatch(loadOpponents(players.opponents));
                dispatch(loadHand(hand));
                dispatch(loadPlayedTilesSinceLastTurn(lastPlayedTiles));

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
                dispatch(setErrorDialog(`There was a problem loading the data of game. [ID = ${game.id}]`, error.message, redirectHome));
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
                return dispatch(loadGameData());
            })
            .finally(() => {
                dispatch(endTurn);
            });
    };
}

export const playTile = (handTile: number, boardTile: number): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(handTile, -1, boardTile, '', ''))
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

export const swapCastePieces = (boardTileFrom: number, boardTileTo: number, casteFrom: Caste, casteTo: Caste): ThunkActionResult<void> => {

    return (dispatch: ThunkDispatchResult<void>) => {

        return dispatch(play(TILE_SWAP_ID, boardTileFrom, boardTileTo, casteFrom, casteTo))
            .catch((error: any) => {
                dispatch(setErrorDialog('Caste pieces swap was unsuccessful.', error.message));
                dispatch(openDialog(DialogType.Error));
            });
    };
}