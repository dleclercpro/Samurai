import React from 'react';
import './TileBackground.scss';

interface Props {
    path: string,
    stroke: number,
    isWater?: boolean,
}

const TileBackground: React.FC<Props> = (props) => {
    const { path, stroke, isWater } = props;

    return (
        <polygon
            className={`
                tile-background 
                ${isWater ? 'is-water' : ''}
            `}
            points={path}
            strokeWidth={stroke}
        />
    );
}

export default TileBackground;