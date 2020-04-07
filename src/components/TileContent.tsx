import React from 'react';
import { PlayerColor, TileType, Action, Caste } from '../types/GameTypes';
import './TileContent.scss';
import TileIcon from './TileIcon';
import { TILE_SIZE, TILE_STROKE, TILE_PATH } from '../config';
import { getPositionInHexagon } from '../lib';
import TileBackground from './TileBackground';
import TileText from './TileText';

interface OwnProps {
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
    isPlayable: boolean,
    isSwitch: boolean,
}

type Props = OwnProps;

class TileContent extends React.Component<Props, {}> {

    getNormal = () => {
        const { strength, type } = this.props;
        const { width, height } = TILE_SIZE;
        
        const iconPosition = getPositionInHexagon(0, 2, TILE_SIZE);
        const iconSize = { width: 2/5 * width, height: 2/5 * height };
        const textPosition = { x: 2/3 * width, y: height / 2 };
    
        return (
            <React.Fragment>
                <TileBackground path={TILE_PATH} stroke={TILE_STROKE} />
                <TileText position={textPosition}>{strength}</TileText>
                <TileIcon position={iconPosition} size={iconSize} type={type} />
            </React.Fragment>
        );
    }

    getSwitch = () => {
        const { width, height } = TILE_SIZE;
        
        const iconSize = { width: width / 4, height: height / 4 };
        
        const switchIconPosition = getPositionInHexagon(0, 1, TILE_SIZE);
        switchIconPosition.y += iconSize.height / 4;
    
        return (
            <React.Fragment>
                <TileBackground path={TILE_PATH} stroke={TILE_STROKE} />
                <TileIcon position={getPositionInHexagon(0, 4, TILE_SIZE)} size={iconSize} type={Caste.Military} />
                <TileIcon position={getPositionInHexagon(1, 4, TILE_SIZE)} size={iconSize} type={Caste.Religion} />
                <TileIcon position={getPositionInHexagon(2, 4, TILE_SIZE)} size={iconSize} type={Caste.Commerce} />
                <TileIcon position={switchIconPosition} size={iconSize} type={Action.Move} />
            </React.Fragment>
        );
    }

    getColor = (color: PlayerColor): string => {
        switch (color) {
            case PlayerColor.Red:
                return 'is-red';
            case PlayerColor.Purple:
                return 'is-purple';
            case PlayerColor.Orange:
                return 'is-orange';
            case PlayerColor.Green:
                return 'is-green';
            default:
                return '';
        }
    }

    render() {
        const { type, color, isPlayable, canReplay } = this.props;
        const { width, height } = TILE_SIZE;
    
        const isSwitch = type === Action.Switch;
    
        const replayIconPosition = { x: width / 2, y: 5/6 * height};
        const replayIconSize = { width: width / 8, height: height / 8 };
    
        return (
            <g
                className={`
                    tile-content
                    ${color ? this.getColor(color) : ''}
                    ${isPlayable ? 'is-playable' : ''}
                    ${isSwitch ? 'is-switch' : ''}
                `}
            >
                {isSwitch ? this.getSwitch() : this.getNormal()}
                {canReplay && <TileIcon position={replayIconPosition} size={replayIconSize} type={Action.Replay} />}
            </g>
        );
    }
}

export default TileContent;