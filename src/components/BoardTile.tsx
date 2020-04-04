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
    path: string,            // SVG path of tile
    stroke: number,          // Stroke width of tile in SVG
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

    getCastePiecePosition = (index: number, nPieces: number) => {
        const { width, height } = this.props.size;
        let x = width / 2;
        let y = height / 2;

        switch (nPieces) {
            case 1:
                break;
            case 2:
                switch (index) {
                    case 0:
                        x = width / 3;
                        break;
                    case 1:
                        x = 2 / 3 * width;
                        break;
                    default:
                        throw new Error('Wrong index.');
                }
                break;
            case 3:
                switch (index) {
                    case 0:
                        x = width / 3;
                        y = height / 3;
                        break;
                    case 1:
                        x = 2 / 3 * width;
                        y = height / 3;
                        break;
                    case 2:
                        x = width / 2;
                        y = 2 / 3 * height;
                        break;
                    default:
                        throw new Error('Wrong index.');
                }
                break;
            default:
                throw new Error('Wrong number of pieces.');
        }

        return { x, y };
    }

    render() {
        const { position, size, path, stroke, rotation, spaces, isWater } = this.props;
        const { width, height } = size;

        const center = { x: width / 2, y: height / 2 };
        const positionTransform = `translate(${position.x},${position.y})`;
        const rotationTransform = `rotate(${rotation} ${center.x} ${center.y})`;

        const pieceSize = { width: width / 3, height: height / 3};
    
        return (
            <g className='board-tile' transform={positionTransform} onClick={this.handleClick}>
                <BoardTileBackground
                    path={path}
                    stroke={stroke}
                    isWater={isWater}
                />

                <g className='board-tile-content' transform={rotationTransform}>
                    {spaces.map((space: Caste, index: number) => {
                        const position = this.getCastePiecePosition(index, spaces.length);

                        return (
                            <BoardTileCastePiece
                                key={index}
                                position={position}
                                size={pieceSize}
                                caste={space}
                            />
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