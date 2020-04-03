import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Caste, Size2D } from '../types/GameTypes';
import './PlayerTile.scss';
import { AppAction } from '../actions';

interface PlayerTileProps {
    size: Size2D,            // Size of tile (in pixels)
    path: string,
    stroke: number,
    caste: Caste,
    strength: number,
    isWater?: boolean,
}

interface PlayerTileState {
    
}

class PlayerTile extends React.Component<PlayerTileProps, PlayerTileState> {

    getIcon = (caste: Caste): null => {
        switch (caste) {
            case Caste.Military:
                return null;
            case Caste.Religion:
                return null;
            case Caste.Commerce:
                return null;
            default:
                throw new Error('getIcon: wrong caste.');
        }
    }

    render() {
        const { size, path, stroke, strength, caste, isWater } = this.props;
        const { width, height } = size;
        const textX = width / 2;
        const textY = height / 2;
    
        return (
            <svg className='player-tile' viewBox={`0 0 ${width} ${height}`}>
                <polygon
                    className={`player-tile-background ${isWater ? 'is-water' : ''}`}
                    points={path}
                    strokeWidth={stroke}
                />
                <text
                    className='player-tile-text'
                    x={textX}
                    y={textY}
                >
                    {strength}
                </text>
                {this.getIcon(caste)}
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTile);