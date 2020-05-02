import { PlayersState } from '../types/StateTypes';
import { PlayersAction } from '../actions';
import { LOAD_PLAYER, LOAD_HAND, LOAD_OPPONENTS, LOAD_PLAYED_TILES_SINCE_LAST_TURN } from '../types/ActionTypes';
import { parsePlayer, parsePlayedTiles } from '../parse';
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
    playedTilesSinceLastTurn: new Map(),
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
        case LOAD_PLAYED_TILES_SINCE_LAST_TURN:
            return {
                ...state,
                playedTilesSinceLastTurn: parsePlayedTiles(action.playedTiles),
            };
        default:
            return state;
    }
};

export default PlayersReducer;