import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, TileType } from '../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import TileBackground from './TileBackground';
import { getPositionInHexagon } from '../lib';
import TileIcon from './TileIcon';
import { TILE_PATH_BOARD, TILE_STROKE, TILE_SIZE, BOARD_ROTATION } from '../config';
import { AppState } from '../types/StateTypes';
import { selectBoardTile } from '../actions/BoardActions';

interface OwnProps {
    id: number,
    position: Coordinates2D,
    types: TileType[],
    isWater?: boolean,
    isPlayable?: boolean,
}

interface StateProps {
    isSelected: boolean,
}

interface DispatchProps {
    openDialog: () => void,
    selectBoardTile: (id: number) => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class BoardTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, isPlayable, openDialog, selectBoardTile } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            selectBoardTile(id);
            openDialog();
        }
    }

    render() {
        const { position, types, isWater, isPlayable } = this.props;
        const { width, height } = TILE_SIZE;
        const center = { x: width / 2, y: height / 2 };
        const rotation = -BOARD_ROTATION;
        const pieceSize = { width: width / 3, height: height / 3};
    
        return (
            <g
                className='board-tile'
                transform={`translate(${position.x},${position.y})`}
                onClick={this.handleClick}
            >
                <TileBackground
                    path={TILE_PATH_BOARD}
                    stroke={TILE_STROKE}
                    isWater={isWater}
                    isPlayable={isPlayable}
                />

                <g className='board-tile-content' transform={`rotate(${rotation} ${center.x} ${center.y})`}>
                    {types.map((type: TileType, index: number) => {
                        const position = getPositionInHexagon(index, types.length, TILE_SIZE);

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

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    isSelected: ownProps.id === state.board.selectedBoardTile,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openDialog: () => dispatch(openDialog),
    selectBoardTile: (id: number) => dispatch(selectBoardTile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileComponent);