import { BoardData, BoardTileData, FullHandTileData, PlayerData, ScoreData, PlayedTilesData, FullHandData } from './types/DataTypes';
import { BoardTileMap, HandTile, PlayerColor, Caste, Figure, Action, TileType, Player, PlayerScore, HandTileMap, PlayedTileMap } from './types/GameTypes';

export const parseBoard = (data: BoardData): BoardTileMap => {
    const rawTiles = Object.values(data).flat();
    const tiles: BoardTileMap = new Map();

    // Build tile map
    rawTiles.forEach((rawTile: BoardTileData) => {
        const { id, coordinates, castes, isClosed, isWater, isSwap } = rawTile;
        
        if (tiles.has(id)) {
            throw new Error('Trying to add same tile twice.');
        }

        tiles.set(id, {
            id,
            coordinates,
            neighborhood: [],
            castes: castes.map(caste => parseCaste(caste)),
            isClosed,
            isWater,
            isSwap,
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
        case 'Swap':
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
        case 'Swap':
            return Action.Swap;
        default:
            return Action.Unknown;
    }
}

export const parseColor = (color: String): PlayerColor => {
    switch (color) {
        case 'RED':
        case 'Red':
            return PlayerColor.Red;
        case 'PURPLE':
        case 'Purple':
            return PlayerColor.Purple;
        case 'ORANGE':
        case 'Orange':
            return PlayerColor.Orange;
        case 'GREEN':
        case 'Green':
            return PlayerColor.Green;
        default:
            return PlayerColor.Unknown;
    }
}

export const parseScore = (data: ScoreData): PlayerScore => {
    const score = new Map();

    score.set(Caste.Military, data['Military']);
    score.set(Caste.Religion, data['Religion']);
    score.set(Caste.Commerce, data['Commerce']);

    return score;
}

export const parsePlayer = (data: PlayerData): Player => {
    const { id, color, username, score, isPlaying, playedTiles, hasWon } = data;
    
    return {
        id,
        username,
        color: parseColor(color),
        playedTiles: parsePlayedTiles(playedTiles),
        score: parseScore(score),
        hasWon,
        isPlaying,
    }
}

export const parseHandTile = (data: FullHandTileData): HandTile => {
    const { id, type, strength, replay } = data;
    
    return {
        id,
        type: parseTileType(type),
        strength,
        replay,
    };
}

export const parsePlayedTiles = (data: PlayedTilesData): PlayedTileMap => {
    const playedTiles = new Map();

    Object.entries(data).forEach(([boardTileId, handTileId]) => {
        if (handTileId !== undefined) {
            playedTiles.set(parseInt(boardTileId), handTileId);
        }
    });

    return playedTiles;
}

export const parseFullHand = (data: FullHandData): HandTileMap => {
    const hand = new Map();

    data.forEach(tile => {
        hand.set(tile.id, parseHandTile(tile));
    });

    return hand;
}