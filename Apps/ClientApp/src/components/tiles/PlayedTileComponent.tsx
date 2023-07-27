import React, { Dispatch } from 'react';
import { PlayerColor, TileType, Coordinates2D, TileMoveStep, GameStep } from '../../types/GameTypes';
import './PlayedTileComponent.scss';
import { TILE_SIZE } from '../../config';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { AppAction } from '../../actions';
import { selectBoardTileToMoveFrom } from '../../actions/GameActions';
import HandTileContent from './HandTileContent';
import { MOVABLE_HAND_TILE_TYPES } from '../../constants';
import { isGameOver } from '../../selectors';

interface OwnProps {
    handTileId: number,
    boardTileId: number,
    position: Coordinates2D,
    rotation: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    replay: boolean,
}

interface StateProps {
    step: GameStep,
    isPlayable: boolean,
    isSelected: boolean,
    wasPlayed: boolean,
    selectBoardTileToMoveFrom: (id: number) => void,
}

type Props = OwnProps & StateProps;

class PlayedTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { boardTileId, step, isPlayable, selectBoardTileToMoveFrom } = this.props;

        if (isPlayable) {
            switch (step) {
                case TileMoveStep.ChooseHandTile:
                    selectBoardTileToMoveFrom(boardTileId);
                    break;
            }
        }
    }

    render() {
        const { position, rotation, color, type, strength, replay, isPlayable, isSelected, wasPlayed } = this.props;
        const { width, height } = TILE_SIZE;
        const center = { x: width / 2, y: height / 2 };
        
        return (
            <g
                className='played-tile-component'
                transform={`translate(${position.x},${position.y}) rotate(${rotation} ${center.x} ${center.y})`}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height}`}
                onClick={this.handleClick}
            >
                <HandTileContent
                    color={color}
                    type={type}
                    strength={strength}
                    replay={replay}
                    isPlayable={isPlayable}
                    isSelected={isSelected}
                    wasPlayed={wasPlayed}
                />
            </g>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { handTileId, boardTileId, type } = ownProps;
    const { step, selection, playedTilesSinceLastTurn } = state.game;
    const { self } = state.players;

    const isMine = self.playedTiles.get(boardTileId) === handTileId;
    const isMovable = MOVABLE_HAND_TILE_TYPES.some(tileType => type === tileType);

    // Playability
    let isPlayable = false;

    switch (step) {
        case TileMoveStep.ChooseHandTile:
            isPlayable = !isGameOver(state.players) && self.isPlaying && isMine && isMovable;
            break;
    }

    const isSelectedForMove = boardTileId === selection.move.from;

    return {
        step,
        isPlayable,
        isSelected: isSelectedForMove,
        wasPlayed: playedTilesSinceLastTurn.get(boardTileId) === handTileId,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectBoardTileToMoveFrom: (id: number) => dispatch(selectBoardTileToMoveFrom(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayedTileComponent);