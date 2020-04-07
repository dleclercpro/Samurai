import React from 'react';
import { PlayerColor, TileType, Coordinates2D } from '../types/GameTypes';
import './PlayedTileComponent.scss';
import { TILE_SIZE } from '../config';
import TileComponent from './TileComponent';

interface OwnProps {
    position: Coordinates2D,
    rotation: number,
    id: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

type Props = OwnProps;

const PlayedTileComponent: React.FC<Props> = (props) => {
    const { position, rotation, color, type, strength, canReplay } = props;
    const { width, height } = TILE_SIZE;
    const center = { x: width / 2, y: height / 2 };
    
    return (
        <g
            className='played-tile-component'
            transform={`translate(${position.x},${position.y}) rotate(${rotation} ${center.x} ${center.y})`}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            <TileComponent
                color={color}
                type={type}
                strength={strength}
                canReplay={canReplay}
            />
        </g>
    );
}

export default PlayedTileComponent;