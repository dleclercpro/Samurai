import React from 'react';
import { PlayerColor, Caste, Action } from '../types/GameTypes';
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
            <TileIcon position={getPositionInHexagon(0, 4, TILE_SIZE)} size={iconSize} type={Caste.Military} />
            <TileIcon position={getPositionInHexagon(1, 4, TILE_SIZE)} size={iconSize} type={Caste.Religion} />
            <TileIcon position={getPositionInHexagon(2, 4, TILE_SIZE)} size={iconSize} type={Caste.Commerce} />
            <TileIcon position={switchIconPosition} size={iconSize} type={Action.Move} />
        </React.Fragment>
    );
};

export default PlayerSwitchTileContent;