import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { Coordinates2D, Caste, Size2D } from '../types/GameTypes';
import './BoardTile.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import CastePiece from './CastePiece';
import TileBackground from './TileBackground';
import { getPositionInHexagon } from '../lib';

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
    isTaken: boolean,
}

class BoardTile extends React.Component<BoardTileProps, BoardTileState> {

    constructor(props: BoardTileProps) {
        super(props);

        this.state = {
            isTaken: false,
        }
    }

    componentDidMount() {
        const { spaces } = this.props;

        this.setState({
            isTaken: spaces.length > 0,
        });
    }

    handleClick = (e: React.MouseEvent) => {
        const { openDialog } = this.props;
        const { isTaken } = this.state;

        e.stopPropagation();

        if (!isTaken) {
            openDialog();
        }
    }

    render() {
        const { position, size, path, stroke, rotation, spaces, isWater } = this.props;
        const { isTaken } = this.state;
        const { width, height } = size;

        const center = { x: width / 2, y: height / 2 };
        const positionTransform = `translate(${position.x},${position.y})`;
        const rotationTransform = `rotate(${rotation} ${center.x} ${center.y})`;

        const pieceSize = { width: width / 3, height: height / 3};
    
        return (
            <g className='board-tile' transform={positionTransform} onClick={this.handleClick}>
                <TileBackground
                    path={path}
                    stroke={stroke}
                    isWater={isWater}
                    isTaken={isTaken}
                />

                <g className='board-tile-content' transform={rotationTransform}>
                    {spaces.map((space: Caste, index: number) => {
                        const position = getPositionInHexagon(index, spaces.length, size);

                        return (
                            <CastePiece
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