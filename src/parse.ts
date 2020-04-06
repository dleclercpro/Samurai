import { BoardJSON, BoardTileJSON, PlayerTileJSON } from './types/JSONTypes';
import { BoardTileMap, TileType, PlayerTile, PlayerColor } from './types/GameTypes';

export const parseBoard = (data: BoardJSON): BoardTileMap => {
    const rawTiles = Object.values(data).flat();
    const tiles: BoardTileMap = new Map();

    // Build tile map
    rawTiles.forEach((rawTile: BoardTileJSON) => {
        const { id, coordinates, types, isWater } = rawTile;
        
        if (tiles.has(id)) {
            console.warn('Trying to add same tile twice.');
            return;
        }

        const tile = {
            id,
            coordinates,
            neighborhood: [],
            types: types.map(type => parseTileType(type)),
            isWater,
        };

        tiles.set(id, tile);
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
        case 'Ship':
            return TileType.Ship;
        case 'Move':
            return TileType.Move;
        case 'Switch':
            return TileType.Switch;
        default:
            return TileType.Unknown;
    }
}

export const parseColor = (color: String): PlayerColor => {
    switch(color) {
        case 'red':
            return PlayerColor.Red;
        case 'purple':
            return PlayerColor.Purple;
        case 'gold':
            return PlayerColor.Gold;
        case 'green':
            return PlayerColor.Green;
        default:
            return PlayerColor.Unknown;
    }
}

export const parsePlayerTile = (data: PlayerTileJSON): PlayerTile => {
    const { id, type, strength, canReplay } = data;
    
    return {
        id,
        type: parseTileType(type),
        strength,
        canReplay,
    };
}