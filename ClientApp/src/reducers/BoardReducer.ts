import { SET_BOARD, RESET_BOARD } from '../types/ActionTypes';
import { parseBoard } from '../parse';
import { getTileNeighborhood } from '../lib';
import { BoardState } from '../types/StateTypes';
import { BoardAction } from '../actions';

const initState: BoardState = {
    tiles: new Map(),
};

const BoardReducer = (state: BoardState = initState, action: BoardAction) => {
    switch (action.type) {
        case RESET_BOARD:
            return {
                ...state,
                tiles: new Map(),
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
                tiles,
            };
        default:
            return state;
    }
};

export default BoardReducer;