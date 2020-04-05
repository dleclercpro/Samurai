import { PlayerState } from "../types/StateTypes";
import { PlayerAction } from "../actions";
import { SELECT_TILE, SET_PLAYER } from "../types/ActionTypes";

const initState = {
    id: -1,
    selectedTileId: -1,
};

const PlayerReducer = (state: PlayerState = initState, action: PlayerAction) => {
    switch (action.type) {
        case SET_PLAYER:
            return {
                ...state,
                id: action.id,
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