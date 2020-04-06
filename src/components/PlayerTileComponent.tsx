import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { TileType, PlayerColor, SpecialTileType } from '../types/GameTypes';
import './PlayerTileComponent.scss';
import { AppAction } from '../actions';
import TileIcon from './TileIcon';
import { selectPlayerTile } from '../actions/PlayerActions';
import { TILE_SIZE } from '../config';
import PlayerStandardTileContent from './PlayerStandardTileContent';
import PlayerSwitchTileContent from './PlayerSwitchTileContent';

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
    selectPlayerTile: (id: number) => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class PlayerTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { isPlayable, selectPlayerTile, id } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            selectPlayerTile(id);
        }
    }

    render() {
        const { color, type, strength, isSelected, canReplay, isPlayable } = this.props;
        const { width, height } = TILE_SIZE;

        const replayIconPosition = { x: width / 2, y: 5 / 6 * height};
        const replayIconSize = { width: width / 8, height: height / 8 };

        const isSwitch = type === TileType.Switch;

        return (
            <svg
                className={`player-tile ${isPlayable && isSelected ? 'is-selected' : ''}`}
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                {isSwitch && <PlayerSwitchTileContent color={color} isPlayable={isPlayable} />}
                {!isSwitch && <PlayerStandardTileContent color={color} type={type} strength={strength} isPlayable={isPlayable} />}
                {canReplay && <TileIcon position={replayIconPosition} size={replayIconSize} type={SpecialTileType.Replay} />}
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    isSelected: ownProps.id === state.player.selectedPlayerTile,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectPlayerTile: (id: number) => dispatch(selectPlayerTile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTileComponent);