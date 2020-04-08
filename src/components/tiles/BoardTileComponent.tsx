import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, Caste, Figure } from '../../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../../actions';
import { openDialog } from '../../actions/DialogActions';
import TileBackground from './TileBackground';
import { TILE_PATH_BOARD, TILE_STROKE, BOARD_ROTATION } from '../../config';
import { AppState } from '../../types/StateTypes';
import BoardTileContent from './BoardTileContent';
import { DialogType } from '../../types/DialogTypes';
import { selectBoardTile, selectCasteSwitchTile } from '../../actions/GameActions';
import { getHand } from '../../selectors';

interface OwnProps {
    id: number,
    position: Coordinates2D,
    castes: Caste[],
    isWater?: boolean,
}

interface StateProps {
    isSwitching: boolean,
    isSelected: boolean,
    isPlayable: boolean,
}

interface DispatchProps {
    openTileChoiceDialog: () => void,
    openCasteChoiceDialog: () => void,
    selectBoardTile: () => void,
    selectCasteSwitchTile: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class BoardTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { isPlayable, isSwitching, openTileChoiceDialog, openCasteChoiceDialog, selectBoardTile, selectCasteSwitchTile } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            if (isSwitching) {
                selectCasteSwitchTile();
                openCasteChoiceDialog();
            } else {
                selectBoardTile();
                openTileChoiceDialog();
            }
        }
    }

    render() {
        const { position, castes, isWater, isPlayable } = this.props;
    
        return (
            <g
                className={`
                    board-tile-component
                    ${isPlayable ? 'is-playable' : ''}
                `}
                transform={`translate(${position.x},${position.y})`}
                onClick={this.handleClick}
            >
                <TileBackground
                    path={TILE_PATH_BOARD}
                    stroke={TILE_STROKE}
                    isWater={isWater}
                />
                {castes.length > 0 &&
                    <BoardTileContent
                        position={position}
                        rotation={-BOARD_ROTATION}
                        castes={castes}
                    />}
            </g>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { game } = state;
    const { isSwitching, casteSwitch, selected } = game;

    const { id, castes, isWater } = ownProps;
    const isCity = castes.length > 0;
    const hasShipInHand = getHand(state).some(tile => tile.type === Figure.Ship);
    const isSelectedForCasteSwitch = id === casteSwitch.from.tile || id === casteSwitch.to.tile;
    let isPlayable = false;

    if (isSwitching) {
        isPlayable = isCity && !isSelectedForCasteSwitch;
    } else {
        isPlayable = !isCity && (!isWater || hasShipInHand);
    }

    return {
        isSwitching: isSwitching,
        isSelected: ownProps.id === selected.boardTile,
        isPlayable,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { id } = ownProps;

    return {
        selectBoardTile: () => dispatch(selectBoardTile(id)),
        selectCasteSwitchTile: () => dispatch(selectCasteSwitchTile(id)),
        openTileChoiceDialog: () => dispatch(openDialog(DialogType.TileChoice)),
        openCasteChoiceDialog: () => dispatch(openDialog(DialogType.CasteChoice)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileComponent);