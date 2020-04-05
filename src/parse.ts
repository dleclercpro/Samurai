import { BoardJSON, TileJSON } from "./types/JSONTypes";
import { TileMap, Caste } from "./types/GameTypes";

/**
 * Build a tile map using corresponding JSON data. Tiles' keys are their
 * coordinates.
 */
export const parseBoard = (data: BoardJSON): TileMap => {
    const rawTiles = Object.values(data).flat();
    const tiles: TileMap = new Map();

    // Build tile map
    rawTiles.forEach((rawTile: TileJSON) => {
        const { coordinates, spaces, isWater } = rawTile;
        
        if (tiles.has(coordinates)) {
            console.warn('Trying to add same tile twice.');
            return;
        }

        const tile = {
            coordinates,
            neighborhood: [],
            spaces: spaces.map(space => parseCaste(space)),
            isWater,
        };

        tiles.set(coordinates, tile);
    });

    return tiles;
}

/**
 * Get caste type based on string.
 */
export const parseCaste = (data: String): Caste => {
    switch(data) {
        case 'Military':
            return Caste.Military;
        case 'Religion':
            return Caste.Religion;
        case 'Commerce':
            return Caste.Commerce;
        default:
            throw new Error('Wrong caste.');
    }
}