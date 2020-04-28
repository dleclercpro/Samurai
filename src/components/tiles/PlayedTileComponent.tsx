import React, { Dispatch } from 'react';
import { PlayerColor, TileType, Coordinates2D, Caste, Figure, TileMoveStep, GameStep } from '../../types/GameTypes';
import './PlayedTileComponent.scss';
import { TILE_SIZE } from '../../config';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';
import { AppAction } from '../../actions';
import { selectBoardTileToMoveFrom } from '../../actions/GameActions';
import HandTileContent from './HandTileContent';

interface OwnProps {
    id: number,
    boardId: number,
    position: Coordinates2D,
    rotation: number,
    color: PlayerColor,
    type: TileType,
    strength: number,
    canReplay: boolean,
}

interface StateProps {
    step: GameStep,
    isPlayable: boolean,
    isSelected: boolean,
    selectBoardTileToMoveFrom: (id: number) => void,
}

type Props = OwnProps & StateProps;

class PlayedTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { boardId, step, isPlayable, selectBoardTileToMoveFrom } = this.props;

        if (isPlayable) {
            switch (step) {
                case TileMoveStep.ChooseHandTile:
                    selectBoardTileToMoveFrom(boardId);
                    break;
            }
        }
    }

    render() {
        const { position, rotation, color, type, strength, canReplay, isPlayable, isSelected } = this.props;
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
                    canReplay={canReplay}
                    isPlayable={isPlayable}
                    isSelected={isSelected}
                />
            </g>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { id, boardId, type } = ownProps;
    const { self } = state.players;
    const { step, selection } = state.game;

    const isPlaying = self.isPlaying;
    const isMine = self.playedTiles.get(boardId) === id;
    const isMovable = [ Caste.Military, Caste.Religion, Caste.Commerce, Figure.Samurai ].some(tileType => type === tileType);
    const isPlayable = isMine && isPlaying && isMovable && (step === TileMoveStep.ChooseHandTile);
    const isSelected = isMine && id === selection.move.from;

    return {
        step,
        isPlayable,
        isSelected,
    };
}

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    selectBoardTileToMoveFrom: (id: number) => dispatch(selectBoardTileToMoveFrom(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayedTileComponent);