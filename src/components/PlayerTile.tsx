import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Caste, Size2D } from '../types/GameTypes';
import './PlayerTile.scss';
import { AppAction } from '../actions';

interface PlayerTileProps {
    size: Size2D,            // Size of tile (in pixels)
    path: string,            // SVG path of tile
    caste: Caste,
    strength: number,
    isWater: boolean,
}

interface PlayerTileState {
    
}

class PlayerTile extends React.Component<PlayerTileProps, PlayerTileState> {

    render() {
        const { size, path, strength, isWater } = this.props;
        const { width, height } = size;
        const textX = width / 2;
        const textY = height / 2;
        const className = `player-tile ${isWater ? 'player-tile--water' : ''}`;
    
        return (
            <g>
                <polygon
                    className={className}
                    points={path}
                />
                <text
                    className='player-tile-text'
                    x={textX}
                    y={textY}
                >
                    {strength}
                </text>
            </g>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTile);