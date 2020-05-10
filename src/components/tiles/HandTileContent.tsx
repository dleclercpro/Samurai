import React from 'react';
import { TileType, Action, Caste, PlayerColor, Figure } from '../../types/GameTypes';
import './HandTileContent.scss';
import TileIcon from './TileIcon';
import { TILE_SIZE, TILE_STROKE, TILE_PATH } from '../../config';
import { getPositionInHexagon, getColor } from '../../lib';
import TileBackground from './TileBackground';
import TileText from './TileText';

interface OwnProps {
    type: TileType,
    color: PlayerColor,
    strength: number,
    canReplay?: boolean,
    isPlayable?: boolean,
    isSelected?: boolean,
    wasPlayed?: boolean,
}

type Props = OwnProps;

interface State {
    isHovered: boolean,
}

class HandTileContent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    handleMouseEnter = (e: React.MouseEvent) => {
        this.setState({
            isHovered: true,
        });
    }

    handleMouseLeave = (e: React.MouseEvent) => {
        this.setState({
            isHovered: false,
        });
    }
    
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

    getSwap = () => {
        const { width, height } = TILE_SIZE;
        
        const iconSize = { width: width / 4, height: height / 4 };
        
        const swapIconPosition = getPositionInHexagon(0, 1, TILE_SIZE);
        swapIconPosition.y += iconSize.height / 4;
    
        return (
            <React.Fragment>
                <TileBackground path={TILE_PATH} stroke={TILE_STROKE} />
                <TileIcon position={getPositionInHexagon(0, 4, TILE_SIZE)} size={iconSize} type={Caste.Military} />
                <TileIcon position={getPositionInHexagon(1, 4, TILE_SIZE)} size={iconSize} type={Caste.Religion} />
                <TileIcon position={getPositionInHexagon(2, 4, TILE_SIZE)} size={iconSize} type={Caste.Commerce} />
                <TileIcon position={swapIconPosition} size={iconSize} type={Action.Swap} />
            </React.Fragment>
        );
    }

    render() {
        const { type, color, isPlayable, isSelected, wasPlayed, canReplay } = this.props;
        const { isHovered } = this.state;
        const { width, height } = TILE_SIZE;

        const replayIconPosition = { x: width / 2, y: 5/6 * height};
        const replayIconSize = { width: width / 8, height: height / 8 };
    
        const isMove = type === Action.Move;
        const isSwap = type === Action.Swap;
        const isShip = type === Figure.Ship;

        return (
            <g
                className={`
                    hand-tile-content
                    ${color ? getColor(color) : ''}
                    ${isHovered ? 'is-hovered' : ''}
                    ${isPlayable ? 'is-playable' : ''}
                    ${isSelected ? 'is-selected' : ''}
                    ${isMove ? 'is-move' : ''}
                    ${isSwap ? 'is-swap' : ''}
                    ${isShip ? 'is-ship' : ''}
                    ${wasPlayed ? 'was-played' : ''}
                `}
                viewBox={`0 0 ${width} ${height}`}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {isSwap ? this.getSwap() : this.getNormal()}
                {canReplay && <TileIcon position={replayIconPosition} size={replayIconSize} type={Action.Replay} />}
            </g>
        );
    }
}

export default HandTileContent;