import React from 'react';
import './TileText.scss';
import { Coordinates2D } from '../types/GameTypes';

interface TileTextProps {
    position: Coordinates2D,
    children: string | number,
}

const TileText: React.FC<TileTextProps> = (props) => {
    const { position, children } = props;
    const { x, y } = position;

    return (
        <text className='tile-text' x={x} y={y}>
            {children}
        </text>
    );
}

export default TileText;