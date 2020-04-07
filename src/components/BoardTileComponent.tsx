import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, Caste } from '../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../actions';
import { openDialog } from '../actions/DialogActions';
import TileBackground from './TileBackground';
import { TILE_PATH_BOARD, TILE_STROKE, BOARD_ROTATION } from '../config';
import { AppState } from '../types/StateTypes';
import { selectTile } from '../actions/BoardActions';
import BoardTileContent from './BoardTileContent';
import { DialogType } from '../types/DialogTypes';

interface OwnProps {
    id: number,
    position: Coordinates2D,
    castes: Caste[],
    isWater?: boolean,
    isPlayable?: boolean,
}

interface StateProps {
    isSelected: boolean,
}

interface DispatchProps {
    openDialog: () => void,
    selectTile: (id: number) => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class BoardTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, isPlayable, openDialog, selectTile } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            selectTile(id);
            openDialog();
        }
    }

    render() {
        const { position, castes, isWater, isPlayable } = this.props;
    
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
                <BoardTileContent
                    position={position}
                    rotation={-BOARD_ROTATION}
                    castes={castes}
                />
            </g>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    isSelected: ownProps.id === state.board.selectedTileID,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    openDialog: () => dispatch(openDialog(DialogType.TileChoice)),
    selectTile: (id: number) => dispatch(selectTile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileComponent);