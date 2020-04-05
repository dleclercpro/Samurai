import { PlayerState } from "../types/StateTypes";
import { PlayerAction } from "../actions";
import { SELECT_TILE, SET_PLAYER, SET_HAND } from "../types/ActionTypes";
import { parsePlayerTile } from "../parse";

const initState = {
    id: -1,
    selectedTileId: -1,
    hand: [],
};

const PlayerReducer = (state: PlayerState = initState, action: PlayerAction) => {
    switch (action.type) {
        case SET_PLAYER:
            return {
                ...state,
                id: action.id,
            };
        case SET_HAND:
            return {
                ...state,
                hand: action.hand.map(tile => parsePlayerTile(tile)),
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