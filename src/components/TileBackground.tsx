import React from 'react';
import './TileBackground.scss';
import { PlayerColor } from '../types/GameTypes';

interface Props {
    path: string,
    stroke: number,
    color?: PlayerColor,
    isWater?: boolean,
    isTaken?: boolean,
}

class TileBackground extends React.Component<Props, {}> {

    getColor = (color: PlayerColor): string => {
        switch (color) {
            case PlayerColor.Red:
                return 'is-red';
            case PlayerColor.Purple:
                return 'is-purple';
            case PlayerColor.Gold:
                return 'is-gold';
            case PlayerColor.Green:
                return 'is-green';
        }
    }

    render() {
        const { path, stroke, color, isTaken, isWater } = this.props;

        return (
            <polygon
                className={`
                    tile-background 
                    ${isTaken ? 'is-taken' : ''}
                    ${isWater ? 'is-water' : ''} 
                    ${color !== undefined ? this.getColor(color) : ''}
                `}
                points={path}
                strokeWidth={stroke}
            />
        );
    }
}

export default TileBackground;