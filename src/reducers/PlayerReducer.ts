import { PlayerState } from "../types/StateTypes";
import { PlayerAction } from "../actions";
import { SELECT_TILE, SET_PLAYER, SET_PLAYER_COLOR, LOAD_HAND } from "../types/ActionTypes";
import { parsePlayerTile, parseColor } from "../parse";
import { PlayerColor } from "../types/GameTypes";

const initState = {
    id: -1,
    color: PlayerColor.Red,
    hand: [],
    selectedTileId: -1,
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
        case SELECT_TILE:
            return {
                ...state,
                selectedTileId: action.id,
            };
        default:
            return state;
    }
};

export default PlayerReducer;