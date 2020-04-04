import React from 'react';
import './TileBackground.scss';

interface TileBackgroundProps {
    path: string,
    stroke: number,
    isWater?: boolean,
}

const TileBackground: React.FC<TileBackgroundProps> = (props) => {
    const { path, stroke, isWater } = props;

    return (
        <polygon
            className={`tile-background ${isWater ? 'is-water' : ''}`}
            points={path}
            strokeWidth={stroke}
        />
    );
}

export default TileBackground;