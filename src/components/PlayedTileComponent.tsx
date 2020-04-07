import React from 'react';
import { PlayerColor, TileType, Coordinates2D } from '../types/GameTypes';
import './PlayedTileComponent.scss';
import { TILE_SIZE } from '../config';
import TileContent from './TileContent';

interface OwnProps {
    position: Coordinates2D,
    rotation: number,
    id: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
    isPlayable: boolean,
}

type Props = OwnProps;

const PlayedTileComponent: React.FC<Props> = (props) => {
    const { position, rotation, color, type, strength, canReplay } = props;
    const { width, height } = TILE_SIZE;
    const center = { x: width / 2, y: height / 2 };

    return (
        <g
            className='played-tile'
            transform={`translate(${position.x},${position.y}) rotate(${rotation} ${center.x} ${center.y})`}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
        >
            <TileContent
                color={color}
                type={type}
                strength={strength}
                canReplay={canReplay}
                isPlayable={false}
            />
        </g>
    );
}

export default PlayedTileComponent;