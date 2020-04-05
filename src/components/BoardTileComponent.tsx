import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, TileType, Size2D } from '../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import TileBackground from './TileBackground';
import { getPositionInHexagon } from '../lib';
import TileIcon from './TileIcon';

interface OwnProps {
    size: Size2D,            // Size of tile (in pixels)
    path: string,            // SVG path of tile
    stroke: number,          // Stroke width of tile in SVG
    position: Coordinates2D, // Position of tile in board (in pixels)
    rotation: number,        // Board rotation
    types: TileType[],       // Free types for caste pieces
    isWater?: boolean,
    isPlayable?: boolean,
}

interface DispatchProps {
    openDialog: () => void,
}

type Props = OwnProps & DispatchProps;

class BoardTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { isPlayable, openDialog } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            openDialog();
        }
    }

    render() {
        const { position, size, path, stroke, rotation, types, isWater, isPlayable } = this.props;
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
                    isPlayable={isPlayable}
                />

                <g className='board-tile-content' transform={rotationTransform}>
                    {types.map((type: TileType, index: number) => {
                        const position = getPositionInHexagon(index, types.length, size);

                        return (
                            <TileIcon
                                key={index}
                                position={position}
                                size={pieceSize}
                                type={type}
                            />
                        );
                    })}
                </g>
            </g>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openDialog: () => dispatch(openDialog),
});

export default connect(() => ({}), mapDispatchToProps)(BoardTileComponent);