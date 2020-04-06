import { PlayerState } from '../types/StateTypes';
import { PlayerAction } from '../actions';
import { SELECT_PLAYER_TILE, SET_PLAYER, SET_PLAYER_COLOR, LOAD_HAND, DESELECT_PLAYER_TILE } from '../types/ActionTypes';
import { parsePlayerTile, parseColor } from '../parse';
import { PlayerColor } from '../types/GameTypes';

const initState = {
    id: -1,
    color: PlayerColor.Unknown,
    hand: [],
    selectedPlayerTile: -1,
};

const PlayerReducer = (state: PlayerState = initState, action: PlayerAction) => {
    switch (action.type) {
        case SET_PLAYER:
            return {
                ...state,
                id: action.id,
            };
        case SET_PLAYER_COLOR:
            return {
                ...state,
                color: parseColor(action.color),
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
                selectedPlayerTile: action.id,
            };
        default:
            return state;
    }
};

export default PlayerReducer;