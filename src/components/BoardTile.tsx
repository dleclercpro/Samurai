import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Coordinates2D, Caste, Size2D } from '../types/GameTypes';
import './BoardTile.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import BoardTileCastePiece from './BoardTileCastePiece';
import BoardTileBackground from './BoardTileBackground';

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

    handleClick = (e: React.MouseEvent) => {
        const { openDialog } = this.props;

        e.stopPropagation();
        openDialog();
    }

    render() {
        const { position, size, path, stroke, rotation, spaces, isWater } = this.props;
        const { width, height } = size;
        const center = { x: width / 2, y: height / 2 };
        const positionTransform = `translate(${position.x},${position.y})`;
        const rotationTransform = `rotate(${rotation} ${center.x} ${center.y})`;
    
        return (
            <g className='board-tile' transform={positionTransform} onClick={this.handleClick}>
                <BoardTileBackground path={path} stroke={stroke} isWater={isWater} />
                <g className='board-tile-content' transform={rotationTransform}>
                    {spaces.map((space: Caste) => {
                        return (
                            <BoardTileCastePiece tileSize={size} caste={space} />
                        );
                    })}
                </g>
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