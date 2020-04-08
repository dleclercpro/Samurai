import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { PlayerColor, TileType, Action } from '../../types/GameTypes';
import './HandTileComponent.scss';
import { AppAction } from '../../actions';
import { selectHandTile, deselectHandTile } from '../../actions/GameActions';
import { TILE_SIZE } from '../../config';
import TileComponent from './TileComponent';
import { openDialog } from '../../actions/DialogActions';
import { DialogType } from '../../types/DialogTypes';

interface OwnProps {
    id: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
    isPlayable: boolean,
}

interface StateProps {
    isSelected: boolean,
}

interface DispatchProps {
    selectHandTile: (id: number) => void,
    deselectHandTile: () => void,
    openCasteSwitchDialog: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { id, type, isPlayable, isSelected, selectHandTile, deselectHandTile, openCasteSwitchDialog } = this.props;
        const isSwitch = type === Action.Switch;
        
        e.stopPropagation();

        // Caste switch
        if (isSwitch) {
            openCasteSwitchDialog();
            return;
        }
        
        // Tile selection
        if (isSelected) {
            deselectHandTile();
        } else if(isPlayable) {
            selectHandTile(id);
        }
    }

    render() {
        const { color, type, strength, isSelected, canReplay, isPlayable } = this.props;
        const { width, height } = TILE_SIZE;

        return (
            <svg
                className={`
                    hand-tile-component
                    ${isPlayable ? 'is-playable' : ''}
                    ${isPlayable && isSelected ? 'is-selected' : ''}
                `}
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                <TileComponent
                    color={color}
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                    isPlayable={isPlayable}
                    isSelected={isSelected}
                />
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    isSelected: ownProps.id === state.game.selectedPlayerTile,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectHandTile: (id: number) => dispatch(selectHandTile(id)),
    deselectHandTile: () => dispatch(deselectHandTile),
    openCasteSwitchDialog: () => dispatch(openDialog(DialogType.CasteSwitch)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);