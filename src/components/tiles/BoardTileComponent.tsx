import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, Caste, CasteSwitch, Figure } from '../../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../../actions';
import { openDialog } from '../../actions/DialogActions';
import TileBackground from './TileBackground';
import { TILE_PATH_BOARD, TILE_STROKE, BOARD_ROTATION } from '../../config';
import { AppState } from '../../types/StateTypes';
import BoardTileContent from './BoardTileContent';
import { DialogType } from '../../types/DialogTypes';
import { selectCasteFrom, selectCasteTo, selectBoardTile } from '../../actions/GameActions';
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
    casteSwitch: CasteSwitch,
}

interface DispatchProps {
    openTileChoiceDialog: () => void,
    openCasteSwitchConfirmDialog: () => void,
    selectBoardTile: (id: number) => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class BoardTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, isPlayable, isSwitching, casteSwitch, openTileChoiceDialog, openCasteSwitchConfirmDialog, selectBoardTile } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            if (isSwitching) {
                const isChoosingFrom = casteSwitch.from.tile === -1 && casteSwitch.from.caste === Caste.Unknown;
                const isChoosingTo = casteSwitch.to.tile === -1 && casteSwitch.to.caste === Caste.Unknown;
    
                if (isChoosingFrom) {
                    return;
                }
                
                if (isChoosingTo) {
                    openCasteSwitchConfirmDialog();
                    return;
                }
            } else {
                selectBoardTile(id);
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
    const { isSwitching, casteSwitch } = game;

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
        isSwitching: game.isSwitching,
        isSelected: ownProps.id === game.selectedBoardTile,
        isPlayable,
        casteSwitch,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectBoardTile: (id: number) => dispatch(selectBoardTile(id)),
    selectCasteFrom: (tile: number, caste: Caste) => dispatch(selectCasteFrom(tile, caste)),
    selectCasteTo: (tile: number, caste: Caste) => dispatch(selectCasteTo(tile, caste)),
    openCasteSwitchConfirmDialog: () => dispatch(openDialog(DialogType.CasteSwitchConfirm)),
    openTileChoiceDialog: () => dispatch(openDialog(DialogType.TileChoice)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileComponent);