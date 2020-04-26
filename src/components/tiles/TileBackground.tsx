import React from 'react';
import './TileBackground.scss';

interface Props {
    path: string,
    stroke: number,
    isEmptyCity?: boolean,
    isWater?: boolean,
}

const TileBackground: React.FC<Props> = (props) => {
    const { path, stroke, isEmptyCity, isWater } = props;

    return (
        <polygon
            className={`
                tile-background 
                ${isEmptyCity ? 'is-empty-city' : ''}
                ${isWater ? 'is-water' : ''}
            `}
            points={path}
            strokeWidth={stroke}
        />
    );
}

export default TileBackground;