import React from 'react';
import { PlayerColor, Figure, TileType } from '../types/GameTypes';
import './PlayerTileContent.scss';
import { getPositionInHexagon } from '../lib';
import TileBackground from './TileBackground';
import TileText from './TileText';
import TileIcon from './TileIcon';
import { TILE_SIZE, TILE_STROKE, TILE_PATH } from '../config';

interface OwnProps {
    color: PlayerColor,
    type: TileType,
    strength: number,
    isPlayable: boolean,
}

type Props = OwnProps;

const PlayerTileContent: React.FC<Props> = (props) => {
    const { color, strength, type, isPlayable } = props;
    const { width, height } = TILE_SIZE;
    
    const iconPosition = getPositionInHexagon(0, 2, TILE_SIZE);
    const iconSize = { width: 2 / 5 * width, height: 2 / 5 * height };
    const textPosition = { x: 2 / 3 * width, y: height / 2 };

    const isShip = type === Figure.Ship;

    return (
        <React.Fragment>
            <TileBackground path={TILE_PATH} stroke={TILE_STROKE} color={color} isShip={isShip} isPlayable={isPlayable} />
            <TileText position={textPosition}>{strength}</TileText>
            <TileIcon position={iconPosition} size={iconSize} type={type} />
        </React.Fragment>
    );
};

export default PlayerTileContent;