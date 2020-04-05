import { BoardJSON, BoardTileJSON, PlayerTileJSON } from "./types/JSONTypes";
import { BoardTileMap, TileType, PlayerTile } from "./types/GameTypes";

export const parseBoard = (data: BoardJSON): BoardTileMap => {
    const rawTiles = Object.values(data).flat();
    const tiles: BoardTileMap = new Map();

    // Build tile map
    rawTiles.forEach((rawTile: BoardTileJSON) => {
        const { coordinates, types, isWater } = rawTile;
        
        if (tiles.has(coordinates)) {
            console.warn('Trying to add same tile twice.');
            return;
        }

        const tile = {
            coordinates,
            neighborhood: [],
            types: types.map(type => parseTileType(type)),
            isWater,
        };

        // Use tile coordinates as key
        tiles.set(coordinates, tile);
    });

    return tiles;
}

export const parseTileType = (data: String): TileType => {
    switch(data) {
        case 'Military':
            return TileType.Military;
        case 'Religion':
            return TileType.Religion;
        case 'Commerce':
            return TileType.Commerce;
        case 'Joker':
            return TileType.Joker;
        case 'Water':
            return TileType.Boat;
        case 'Move':
            return TileType.Move;
        case 'Switch':
            return TileType.Switch;
        default:
            throw new Error('Wrong tile type.');
    }
}

export const parsePlayerTile = (data: PlayerTileJSON): PlayerTile => {
    const { id, type, strength } = data;
    
    return {
        id,
        type: parseTileType(type),
        strength
    };
}