import { PlayersState } from '../types/StateTypes';
import { PlayersAction } from '../actions';
import { SET_SELF, SET_OPPONENTS, RESET_PLAYERS } from '../types/ActionTypes';
import { parsePlayer } from '../parse';
import { PlayerColor } from '../types/GameTypes';

const initPlayersState = {
    id: '',
    username: '',
    color: PlayerColor.Unknown,
    playedTiles: new Map(),
    score: new Map(),
    hasWon: false,
    isPlaying: false,
};

const initState: PlayersState = {
    self: { ...initPlayersState },
    opponents: [],
};

const PlayersReducer = (state: PlayersState = initState, action: PlayersAction) => {
    switch (action.type) {
        case RESET_PLAYERS:
            return {
                ...initState,
            };
        case SET_SELF:
            return {
                ...state,
                self: parsePlayer(action.data),
            };
        case SET_OPPONENTS:
            return {
                ...state,
                opponents: action.data.map(opponent => parsePlayer(opponent)),
            };
        default:
            return state;
    }
};

export default PlayersReducer;