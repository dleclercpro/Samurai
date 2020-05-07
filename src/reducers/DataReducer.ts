import { DataAction } from '../actions';
import { SET_BOARD, SET_FULL_HAND, RESET_BOARD } from '../types/ActionTypes';
import { parseBoard, parseFullHand } from '../parse';
import { getTileNeighborhood } from '../lib';
import { DataState } from '../types/StateTypes';

const initState = {
    fullHand: new Map(),
    board: new Map(),
};

const DataReducer = (state: DataState = initState, action: DataAction) => {
    switch (action.type) {
        case RESET_BOARD:
            return {
                ...state,
                board: new Map(),
            };
        case SET_BOARD:
            const tiles = parseBoard(action.data);

            // Build tile neighborhoods
            for (let tile of tiles.values()) {
                if (tile) {
                    tile.neighborhood = getTileNeighborhood(tile, tiles);
                }
            };

            return {
                ...state,
                board: tiles,
            };
        case SET_FULL_HAND:
            return {
                ...state,
                fullHand: parseFullHand(action.data),
            };
        default:
            return state;
    }
};

export default DataReducer;