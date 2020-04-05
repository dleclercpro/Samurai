import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { AppState } from '../types/StateTypes';
import { TileType, Size2D, PlayerColor } from '../types/GameTypes';
import './PlayerTileComponent.scss';
import { AppAction } from '../actions';
import { getPositionInHexagon } from '../lib';
import TileBackground from './TileBackground';
import TileText from './TileText';
import TileIcon from './TileIcon';
import { selectTile } from '../actions/PlayerActions';

interface OwnProps {
    id: number,
    size: Size2D, // Size of tile (in pixels)
    path: string,
    stroke: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

interface StateProps {
    isSelected: boolean,
}

interface DispatchProps {
    selectTile: (id: number) => void,
}

type Props = OwnProps & StateProps & DispatchProps;

class PlayerTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { selectTile, id } = this.props;
        
        e.stopPropagation();

        selectTile(id);
    }

    render() {
        const { size, path, stroke, color, strength, type, isSelected } = this.props;

        const { width, height } = size;

        const piecePosition = getPositionInHexagon(0, 2, size);
        const pieceSize = { width: 2 / 5 * width, height: 2 / 5 * height };

        const textPosition = { x: 2 / 3 * width, y: height / 2 };
    
        return (
            <svg
                className={`player-tile ${isSelected ? 'is-selected' : ''}`}
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                <TileBackground path={path} stroke={stroke} color={color} isPlayable />
                <TileText position={textPosition}>{strength}</TileText>
                <TileIcon position={piecePosition} size={pieceSize} type={type} />
            </svg>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => ({
    isSelected: ownProps.id === state.player.selectedTileId,
});

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectTile: (id: number) => dispatch(selectTile(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerTileComponent);