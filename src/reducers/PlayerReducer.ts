import { PlayerState } from '../types/StateTypes';
import { PlayerAction } from '../actions';
import { LOAD_PLAYER, LOAD_HAND, LOAD_OPPONENTS } from '../types/ActionTypes';
import { parsePlayer } from '../parse';
import { PlayerColor } from '../types/GameTypes';

const initPlayerState = {
    id: -1,
    color: PlayerColor.Unknown,
    username: '',
    score: new Map(),
    isPlaying: false,
    playedTiles: new Map(),
    hasWon: false,
};

const initState = {
    self: { ...initPlayerState },
    opponents: [],
    hand: [],
};

const PlayerReducer = (state: PlayerState = initState, action: PlayerAction) => {
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
                hand: action.data,
            };
        default:
            return state;
    }
};

export default PlayerReducer;