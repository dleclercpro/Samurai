import React from 'react';
import './TileBackground.scss';

interface Props {
    path: string,
    stroke: number,
    isClosedCity?: boolean,
    isWater?: boolean,
}

const TileBackground: React.FC<Props> = (props) => {
    const { path, stroke, isClosedCity, isWater } = props;

    return (
        <polygon
            className={`
                tile-background 
                ${isClosedCity ? 'is-closed-city' : ''}
                ${isWater ? 'is-water' : ''}
            `}
            points={path}
            strokeWidth={stroke}
        />
    );
}

export default TileBackground;