import React from 'react';
import { TileType, PlayerColor } from '../types/GameTypes';
import './PlayerSwitchTileContent.scss';
import { getPositionInHexagon } from '../lib';
import TileBackground from './TileBackground';
import TileIcon from './TileIcon';
import { TILE_SIZE, TILE_STROKE, TILE_PATH } from '../config';

interface OwnProps {
    color: PlayerColor,
    isPlayable: boolean,
}

type Props = OwnProps;

const PlayerSwitchTileContent: React.FC<Props> = (props) => {
    const { color, isPlayable } = props;
    const { width, height } = TILE_SIZE;
    
    const iconSize = { width: width / 4, height: height / 4 };
    
    const switchIconPosition = getPositionInHexagon(0, 1, TILE_SIZE);
    switchIconPosition.y += iconSize.height / 4;

    return (
        <React.Fragment>
            <TileBackground path={TILE_PATH} stroke={TILE_STROKE} color={color} isPlayable={isPlayable} />
            <TileIcon position={getPositionInHexagon(0, 4, TILE_SIZE)} size={iconSize} type={TileType.Military} />
            <TileIcon position={getPositionInHexagon(1, 4, TILE_SIZE)} size={iconSize} type={TileType.Religion} />
            <TileIcon position={getPositionInHexagon(2, 4, TILE_SIZE)} size={iconSize} type={TileType.Commerce} />
            <TileIcon position={switchIconPosition} size={iconSize} type={TileType.Move} />
        </React.Fragment>
    );
};

export default PlayerSwitchTileContent;