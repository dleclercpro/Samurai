import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { PlayerColor, TileType } from '../types/GameTypes';
import './HandTileComponent.scss';
import { AppAction } from '../actions';
import { selectHandTile, deselectHandTile } from '../actions/GameActions';
import { TILE_SIZE } from '../config';
import TileComponent from './TileComponent';

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
}

type Props = OwnProps & StateProps & DispatchProps;

class HandTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { isPlayable, isSelected, selectHandTile, deselectHandTile, id } = this.props;
        
        e.stopPropagation();

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
    isSelected: ownProps.id === state.game.selectedTileID,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectHandTile: (id: number) => dispatch(selectHandTile(id)),
    deselectHandTile: () => dispatch(deselectHandTile),
});

export default connect(mapStateToProps, mapDispatchToProps)(HandTileComponent);