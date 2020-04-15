import { DataAction } from '../actions';
import { LOAD_BOARD, LOAD_FULL_HAND } from '../types/ActionTypes';
import { parseBoard, parseInitHand } from '../parse';
import { getTileNeighborhood } from '../lib';
import { DataState } from '../types/StateTypes';

const initState = {
    tiles: new Map(),
    initHand: new Map(),
};

const DataReducer = (state: DataState = initState, action: DataAction) => {
    switch (action.type) {
        case LOAD_BOARD:
            const tiles = parseBoard(action.data);

            // Build tile neighborhoods
            for (let tile of tiles.values()) {
                if (tile) {
                    tile.neighborhood = getTileNeighborhood(tile, tiles);
                }
            };

            return {
                ...state,
                tiles,
            };
        case LOAD_FULL_HAND:
            return {
                ...state,
                initHand: parseInitHand(action.data),
            };
        default:
            return state;
    }
};

export default DataReducer;