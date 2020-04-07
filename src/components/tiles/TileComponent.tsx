import React from 'react';
import { PlayerColor, TileType, Action } from '../../types/GameTypes';
import './TileComponent.scss';
import { TILE_SIZE } from '../../config';
import TileContent from './TileContent';

interface OwnProps {
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
    isPlayable?: boolean,
    isSelected?: boolean,
}

type Props = OwnProps;

class TileComponent extends React.Component<Props, {}> {

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
        const { color, type, strength, canReplay, isPlayable, isSelected } = this.props;
        const { width, height } = TILE_SIZE;
        const isSwitch = type === Action.Switch;
    
        return (
            <g
                className={`
                    tile-component
                    ${isPlayable ? 'is-playable' : ''}
                    ${isPlayable && isSelected ? 'is-selected' : ''}
                    ${color ? this.getColor(color) : ''}
                    ${isSwitch ? 'is-switch' : ''}
                `}
                viewBox={`0 0 ${width} ${height}`}
            >
                <TileContent
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                />
            </g>
        );
    }
}

export default TileComponent;