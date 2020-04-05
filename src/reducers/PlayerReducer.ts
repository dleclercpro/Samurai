import { PlayerState } from "../types/StateTypes";
import { PlayerAction } from "../actions";
import { SELECT_TILE } from "../types/ActionTypes";
import { Tile } from "../types/GameTypes";

const EMPTY_TILE: Tile = {
    coordinates: { x: 0, y: 0 },
    neighborhood: [],
    spaces: [],
    isWater: false,
}

const initState = {
    selectedTile: EMPTY_TILE,
};

const PlayerReducer = (state: PlayerState = initState, action: PlayerAction) => {
    switch (action.type) {
        case SELECT_TILE:
            return {
                ...state,
                selectedTile: action.tile,
            };
        default:
            return state;
    }
};

export default PlayerReducer;