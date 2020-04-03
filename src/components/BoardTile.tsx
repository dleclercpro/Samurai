import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Coordinates2D, Caste, Size2D } from '../types/GameTypes';
import './BoardTile.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';

interface BoardTileProps {
    size: Size2D,            // Size of tile (in pixels)
    path: string,
    stroke: number,
    position: Coordinates2D, // Position of tile in board (in pixels)
    rotation: number,        // Board rotation
    spaces: Caste[],         // Free spaces for caste pieces
    isWater?: boolean,
    
    openDialog: () => void,
}

interface BoardTileState {
    
}

class BoardTile extends React.Component<BoardTileProps, BoardTileState> {

    render() {
        const { position, size, path, stroke, rotation, spaces, isWater, openDialog } = this.props;
        const { width, height } = size;
        const textX = width / 2;
        const textY = height / 2;
        const transform = `translate(${position.x},${position.y})`;
        const textTransform = `rotate(${rotation} ${textX} ${textY})`;
    
        return (
            <g className='board-tile' transform={transform}>
                <polygon
                    className={`board-tile-background ${isWater ? 'is-water' : ''}`}
                    points={path}
                    strokeWidth={stroke}
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