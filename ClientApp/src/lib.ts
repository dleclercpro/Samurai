import { Size2D, Coordinates2D, BoardTile, BoardTileMap, Caste, Figure, HandTile, PlayerColor } from './types/GameTypes';
import { FormFields, FormPayload } from './types/FormTypes';
import { FullHandData } from './types/DataTypes';

export const hasMultiple = <T> (element: T, list: T[]) => {
    return (list.filter(el => el === element)).length > 1;
}

export const getHexagonalPath = (size: Size2D, stroke: number): string => {
    const { width, height } = size;
    const innerWidth = width - stroke;

    const points = [
        [stroke / 2, height / 2],
        [0.25 * innerWidth + stroke / 2, height - stroke / 2],
        [0.75 * innerWidth + stroke / 2, height - stroke / 2],
        [width - stroke / 2, height / 2],
        [0.75 * innerWidth + stroke / 2, stroke / 2],
        [0.25 * innerWidth + stroke / 2, stroke / 2]
    ];

    return points.reduce((str, point, i) => {
        const [ x, y ] = point;

        return str + x + ',' + y + (i + 1 < points.length ? ' ' : '');
    }, '');
}

export const getPositionInHexagon = (i: number, n: number, size: Size2D): Coordinates2D => {
    const { width, height } = size;
    let x = width / 2;
    let y = height / 2;

    switch (n) {
        case 2:
            switch (i) {
                case 0:
                    x = width / 3;
                    break;
                case 1:
                    x = 2/3 * width;
                    break;
            }
            break;
        case 3:
            switch (i) {
                case 0:
                    x = width / 3;
                    y = height / 3;
                    break;
                case 1:
                    x = 2/3 * width;
                    y = height / 3;
                    break;
                case 2:
                    x = width / 2;
                    y = 2/3 * height;
                    break;
            }
            break;
        case 4:
            switch (i) {
                case 0:
                    x = width / 4;
                    y = height / 2;
                    break;
                case 1:
                    x = width / 2;
                    y = height / 4;
                    break;
                case 2:
                    x = 3/4 * width;
                    y = height / 2;
                    break;
                case 3:
                    x = width / 2;
                    y = 3/4 * height;
                    break;
            }
    }

    if (x === undefined || y === undefined) {
        throw new Error('Invalid position.');
    }

    return { x, y };
}

export const getTileNeighborhood = (tile: BoardTile, tiles: BoardTileMap): number[] => {
    let neighborhood = [];

    if (tiles) {
        for (let otherTile of tiles.values()) {
            if (tile && otherTile) {
                const x0 = tile.coordinates.x;
                const y0 = tile.coordinates.y;
                const x1 = otherTile.coordinates.x;
                const y1 = otherTile.coordinates.y;
        
                // Neighbor criteria based on sum of coordinates difference
                const delta = Math.abs(x0 - x1) + Math.abs(y0 - y1);
        
                if (delta > 0 && delta <= 2) {
                    neighborhood.push(otherTile.id);
                }
            }
        }
    }

    return neighborhood;
}

export const getFormPayload = (fields: FormFields): FormPayload => {
    return Object.keys(fields).reduce((content, name) => {
        return {
            ...content,
            [name]: fields[name].value,
        };
    }, {});
}

export const getRandomHand = (fullHand: FullHandData) => {
    const randomIndexes = new Set<number>();
    const handSize = 5;

    while (randomIndexes.size < handSize) {
        const i = Math.floor(Math.random() * fullHand.length);
        
        if (!randomIndexes.has(i)) {
            randomIndexes.add(i);
        }
    }

    return [ ...randomIndexes ];
}

export const isGroundHandTile = (tile: HandTile) => {
    switch (tile.type) {
        case Caste.Military:
        case Caste.Religion:
        case Caste.Commerce:
        case Figure.Samurai:
            return true;
        default:
            return false;
    }
}

export const getColor = (color: PlayerColor): string => {
    switch (color) {
        case PlayerColor.Red:
            return 'is-red';
        case PlayerColor.Purple:
            return 'is-purple';
        case PlayerColor.Orange:
            return 'is-orange';
        case PlayerColor.Green:
            return 'is-green';
        default:
            return '';
    }
}

export const setIntervalAsync = (fn: () => Promise<void>, dt: number) => {
    fn().then(() => {
        setTimeout(() => setIntervalAsync(fn, dt), dt);
    });
}