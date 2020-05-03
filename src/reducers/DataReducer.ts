import { DataAction } from '../actions';
import { SET_BOARD, SET_FULL_HAND } from '../types/ActionTypes';
import { parseBoard, parseFullHand } from '../parse';
import { getTileNeighborhood } from '../lib';
import { DataState } from '../types/StateTypes';

const initState = {
    tiles: new Map(),
    fullHand: new Map(),
};

const DataReducer = (state: DataState = initState, action: DataAction) => {
    switch (action.type) {
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
                tiles,
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