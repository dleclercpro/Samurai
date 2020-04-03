import { Size2D } from './types/GameTypes';

export const getTilePath = (size: Size2D, stroke: number): string => {
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