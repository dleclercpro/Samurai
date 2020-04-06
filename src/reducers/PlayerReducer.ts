import { PlayerState } from '../types/StateTypes';
import { PlayerAction } from '../actions';
import { SELECT_PLAYER_TILE, LOAD_PLAYER, LOAD_HAND, DESELECT_PLAYER_TILE, LOAD_OPPONENTS } from '../types/ActionTypes';
import { parsePlayerTile, parsePlayer } from '../parse';
import { PlayerColor } from '../types/GameTypes';

const initState = {
    self: {
        id: 0,
        color: PlayerColor.Unknown,
        username: '',
        isPlaying: false,
        score: new Map(),
    },
    opponents: [],
    hand: [],
    selectedTileID: -1,
};

const PlayerReducer = (state: PlayerState = initState, action: PlayerAction) => {
    switch (action.type) {
        case LOAD_PLAYER:
            return {
                ...state,
                self: parsePlayer(action.player),
            };
        case LOAD_OPPONENTS:
            return {
                ...state,
                opponents: action.opponents.map(opponent => parsePlayer(opponent)),
            };
        case LOAD_HAND:
            return {
                ...state,
                hand: action.json.map(tile => parsePlayerTile(tile)),
            };
        case SELECT_PLAYER_TILE:
        case DESELECT_PLAYER_TILE:
            return {
                ...state,
                selectedTileID: action.id,
            };
        default:
            return state;
    }
};

export default PlayerReducer;