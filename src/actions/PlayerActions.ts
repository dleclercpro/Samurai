import { SELECT_TILE, SelectTile } from "../types/ActionTypes";
import { Tile } from "../types/GameTypes";

export const selectTile = (tile: Tile): SelectTile => ({
    type: SELECT_TILE,
    tile,
});