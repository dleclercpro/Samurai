const EPSILON: number = Math.pow(10, -9);

export const equals = (x: number, y: number, epsilon: number = EPSILON) => {
    return Math.abs(x - y) < epsilon;
}

export const sum = (array: number[]) => {
    return array.reduce((total, x) => total + x, 0);
}

export const round = (x: number, decimals: number) => {
    const pow = Math.pow(10, decimals)

    return Math.round(x * pow) / pow;
}

export const getAverage = (arr: number[]) => {
    return sum(arr) / arr.length;
}

export const getRange = (x: number) => {
    return [...Array(x).keys()];
}

export const getEvenRange = (to: number) => {
    return getRange(to).filter(i => i % 2 === 0);
}

export const getUnevenRange = (to: number) => {
    return getRange(to).filter(i => i % 2 !== 0);
}

export const getPairIndices = (n: number) => {
    let indices: [number, number][] = [];

    if (n <= 0) {
        throw new Error('Invalid # of pairs.');
    }

    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            indices = [...indices, [i, j]];
        }
    }

    return indices;
};