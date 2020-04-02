import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Coordinates2D, Caste, Size2D } from '../types/GameTypes';
import './BoardTile.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';

interface BoardTileProps {
    size: Size2D,            // Size of tile (in pixels)
    position: Coordinates2D, // Position of tile in board (in pixels)
    rotation: number,        // Board rotation
    path: string,            // SVG path of tile
    spaces: Caste[],         // Free spaces for caste pieces
    isWater: boolean,
    
    openDialog: () => void,
}

interface BoardTileState {
    
}

class BoardTile extends React.Component<BoardTileProps, BoardTileState> {

    render() {
        const { position, size, rotation, path, spaces, isWater, openDialog } = this.props;
        const { width, height } = size;
        const textX = width / 2;
        const textY = height / 2;
        const className = `board-tile ${isWater ? 'board-tile--water' : ''}`;
        const transform = `translate(${position.x},${position.y})`;
        const textTransform = `rotate(${rotation} ${textX} ${textY})`;
    
        return (
            <g transform={transform}>
                <polygon
                    className={className}
                    points={path}
                    onClick={openDialog}
                />
                <text
                    className='board-tile-text'
                    transform={textTransform}
                    x={textX}
                    y={textY}
                >
                        {spaces.length}
                </text>
            </g>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openDialog: () => dispatch(openDialog),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardTile);