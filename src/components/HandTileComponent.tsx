import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { PlayerColor, TileType, Action } from '../types/GameTypes';
import './HandTileComponent.scss';
import { AppAction } from '../actions';
import { selectHandTile } from '../actions/GameActions';
import { TILE_SIZE } from '../config';
import TileContent from './TileContent';

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
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { isPlayable, selectHandTile, id } = this.props;
        
        e.stopPropagation();

        if (isPlayable) {
            selectHandTile(id);
        }
    }

    render() {
        const { color, type, strength, isSelected, canReplay, isPlayable } = this.props;
        const { width, height } = TILE_SIZE;
        const isSwitch = type === Action.Switch;

        return (
            <svg
                className={`
                    hand-tile
                    ${isPlayable ? 'is-playable' : ''}
                    ${isPlayable && isSelected ? 'is-selected' : ''}
                `}
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                <TileContent
                    color={color}
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                    isSwitch={isSwitch}
                />
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    isSelected: ownProps.id === state.game.selectedTileID,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectHandTile: (id: number) => dispatch(selectHandTile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);