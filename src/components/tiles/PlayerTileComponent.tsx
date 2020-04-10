import React from 'react';
import { PlayerColor, TileType, Action } from '../../types/GameTypes';
import './PlayerTileComponent.scss';
import { TILE_SIZE } from '../../config';
import PlayerTileContent from './PlayerTileContent';

interface OwnProps {
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
    isPlayable?: boolean,
    isSelected?: boolean,
}

type Props = OwnProps;

class PlayerTileComponent extends React.Component<Props, {}> {

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
        const isMove = type === Action.Move;
        const isSwitch = type === Action.Switch;
    
        return (
            <g
                className={`
                    player-tile-component
                    ${isPlayable ? 'is-playable' : ''}
                    ${isSelected ? 'is-selected' : ''}
                    ${color ? this.getColor(color) : ''}
                    ${isMove ? 'is-move' : ''}
                    ${isSwitch ? 'is-switch' : ''}
                `}
                viewBox={`0 0 ${width} ${height}`}
            >
                <PlayerTileContent
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                />
            </g>
        );
    }
}

export default PlayerTileComponent;