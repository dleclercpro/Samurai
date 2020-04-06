import React from 'react';
import './TileBackground.scss';
import { PlayerColor } from '../types/GameTypes';

interface Props {
    path: string,
    stroke: number,
    color?: PlayerColor,
    isWater?: boolean,
    isPlayable?: boolean,
    isShip?: boolean,
}

class TileBackground extends React.Component<Props, {}> {

    getColor = (color: PlayerColor): string => {
        switch (color) {
            case PlayerColor.Red:
                return 'is-red';
            case PlayerColor.Blue:
                return 'is-blue';
            case PlayerColor.Orange:
                return 'is-orange';
            case PlayerColor.Green:
                return 'is-green';
            default:
                return '';
        }
    }

    render() {
        const { path, stroke, color, isPlayable, isWater, isShip } = this.props;

        return (
            <polygon
                className={`
                    tile-background 
                    ${isPlayable ? 'is-playable' : ''}
                    ${isWater ? 'is-water' : ''}
                    ${isShip ? 'is-ship' : ''}
                    ${color ? this.getColor(color) : ''}
                `}
                points={path}
                strokeWidth={stroke}
            />
        );
    }
}

export default TileBackground;