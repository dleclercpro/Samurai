import { BoardState } from "../types/StateTypes";
import { BoardAction } from "../actions";
import { LOAD_BOARD } from "../types/ActionTypes";
import { parseBoard } from "../parse";
import { getTileNeighborhood } from "../lib";

const initState = {
    tiles: new Map(),
};

const BoardReducer = (state: BoardState = initState, action: BoardAction) => {
    switch (action.type) {
        case LOAD_BOARD:
            const tiles = parseBoard(action.json);

            // Build tile neighborhoods
            if (tiles) {
                for (let tile of tiles.values()) {
                    if (tile) {
                        tile.neighborhood = getTileNeighborhood(tile, tiles);
                    }
                };
            }

            return {
                ...state,
                tiles,
            };
        default:
            return state;
    }
};

export default BoardReducer;