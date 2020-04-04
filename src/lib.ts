import { Size2D, Coordinates2D } from './types/GameTypes';

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
                    x = 2 / 3 * width;
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
                    x = 2 / 3 * width;
                    y = height / 3;
                    break;
                case 2:
                    x = width / 2;
                    y = 2 / 3 * height;
                    break;
            }
            break;
    }

    if (x === undefined || y === undefined) {
        throw new Error('Invalid position.');
    }

    return { x, y };
}