import { PlayersState } from '../types/StateTypes';
import { PlayersAction } from '../actions';
import { LOAD_PLAYER, LOAD_HAND, LOAD_OPPONENTS, RESET_LAST_PLAYED_TILES, SET_LAST_PLAYED_TILES, RESET_PLAYED_TILES, SET_PLAYED_TILES } from '../types/ActionTypes';
import { parsePlayer } from '../parse';
import { PlayerColor } from '../types/GameTypes';

const initPlayersState = {
    id: -1,
    username: '',
    color: PlayerColor.Unknown,
    hand: [],
    playedTiles: new Map(),
    score: new Map(),
    hasWon: false,
    isPlaying: false,
};

const initState = {
    self: { ...initPlayersState },
    opponents: [],
    lastPlayedTiles: new Map(),
    playedTiles: new Map(),
};

const PlayersReducer = (state: PlayersState = initState, action: PlayersAction) => {
    switch (action.type) {
        case LOAD_PLAYER:
            return {
                ...state,
                self: parsePlayer(action.data),
            };
        case LOAD_OPPONENTS:
            return {
                ...state,
                opponents: action.data.map(opponent => parsePlayer(opponent)),
            };
        case LOAD_HAND:
            return {
                ...state,
                self: {
                    ...state.self,
                    hand: action.data,
                },
            };
        case RESET_LAST_PLAYED_TILES:
            return {
                ...state,
                lastPlayedTiles: new Map(),
            };
        case SET_LAST_PLAYED_TILES:
            return {
                ...state,
                lastPlayedTiles: action.playedTiles,
            };
        case RESET_PLAYED_TILES:
            return {
                ...state,
                playedTiles: new Map(),
            };
        case SET_PLAYED_TILES:
            return {
                ...state,
                playedTiles: action.playedTiles,
            };
        default:
            return state;
    }
};

export default PlayersReducer;