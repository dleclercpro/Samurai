import { BoardJSON, TileJSON, PlayerTileJSON, PlayerJSON, PlayerScoreJSON, PlayedTileMapJSON } from './types/JSONTypes';
import { TileMap, PlayerTile, PlayerColor, Caste, Figure, Action, TileType, Player, PlayerScore, PlayedTileMap } from './types/GameTypes';

export const parseBoard = (data: BoardJSON): TileMap => {
    const rawTiles = Object.values(data).flat();
    const tiles: TileMap = new Map();

    // Build tile map
    rawTiles.forEach((rawTile: TileJSON) => {
        const { id, coordinates, castes, isWater } = rawTile;
        
        if (tiles.has(id)) {
            console.warn('Trying to add same tile twice.');
            return;
        }

        tiles.set(id, {
            id,
            coordinates,
            neighborhood: [],
            castes: castes.map(caste => parseCaste(caste)),
            isWater,
        });
    });

    return tiles;
}

export const parseTileType = (data: String): TileType => {
    switch (data) {
        case 'Military':
        case 'Religion':
        case 'Commerce':
            return parseCaste(data);
        case 'Samurai':
        case 'Ship':
            return parseFigure(data);
        case 'Move':
        case 'Switch':
            return parseAction(data);
    }
}

export const parseCaste = (data: String) : Caste => {
    switch (data) {
        case 'Military':
            return Caste.Military;
        case 'Religion':
            return Caste.Religion;
        case 'Commerce':
            return Caste.Commerce;
        default:
            return Caste.Unknown;
    }
}

export const parseFigure = (data: String) : Figure => {
    switch (data) {
        case 'Samurai':
            return Figure.Samurai;
        case 'Ship':
            return Figure.Ship;
        default:
            return Figure.Unknown;
    }
}

export const parseAction = (data: String) : Action => {
    switch (data) {
        case 'Move':
            return Action.Move;
        case 'Switch':
            return Action.Switch;
        default:
            return Action.Unknown;
    }
}

export const parseColor = (color: String): PlayerColor => {
    switch (color) {
        case 'red':
            return PlayerColor.Red;
        case 'purple':
            return PlayerColor.Purple;
        case 'orange':
            return PlayerColor.Orange;
        case 'green':
            return PlayerColor.Green;
        default:
            return PlayerColor.Unknown;
    }
}

export const parseScore = (data: PlayerScoreJSON): PlayerScore => {
    const score = new Map();

    score.set(Caste.Military, data['Military']);
    score.set(Caste.Religion, data['Religion']);
    score.set(Caste.Commerce, data['Commerce']);

    return score;
}

export const parsePlayer = (data: PlayerJSON): Player => {
    const { id, color, username, score, isPlaying, playedTiles } = data;
    
    return {
        id,
        username,
        isPlaying,
        color: parseColor(color),
        score: parseScore(score),
        playedTiles: parsePlayedTileMap(playedTiles),
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

export const parsePlayedTileMap = (data: PlayedTileMapJSON): PlayedTileMap => {
    const playedTiles = new Map<number, number>();

    Object.entries(data).forEach(([boardID, initHandID]) => {
        if (initHandID !== undefined) {
            playedTiles.set(parseInt(boardID), initHandID);
        }
    });

    return playedTiles;
}