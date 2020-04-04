import React from 'react';
import './BoardTileBackground.scss';

interface BoardTileBackgroundProps {
    path: string,
    stroke: number,
    isWater?: boolean,
}

const BoardTileBackground: React.FC<BoardTileBackgroundProps> = (props) => {
    const { path, stroke, isWater } = props;

    return (
        <polygon
            className={`board-tile-background ${isWater ? 'is-water' : ''}`}
            points={path}
            strokeWidth={stroke}
        />
    );
}

export default BoardTileBackground;