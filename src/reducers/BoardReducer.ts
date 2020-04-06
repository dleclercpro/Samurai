import { BoardState } from '../types/StateTypes';
import { BoardAction } from '../actions';
import { LOAD_BOARD, SELECT_BOARD_TILE, DESELECT_BOARD_TILE } from '../types/ActionTypes';
import { parseBoard } from '../parse';
import { getTileNeighborhood } from '../lib';

const initState = {
    tiles: new Map(),
    selectedTile: -1,
};

const BoardReducer = (state: BoardState = initState, action: BoardAction) => {
    switch (action.type) {
        case LOAD_BOARD:
            const tiles = parseBoard(action.json);

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
        case SELECT_BOARD_TILE:
        case DESELECT_BOARD_TILE:
            return {
                ...state,
                selectedTile: action.id,
            };
        default:
            return state;
    }
};

export default BoardReducer;