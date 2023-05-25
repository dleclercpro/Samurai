import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, Caste, Figure, CasteSwapStep, TilePlayStep, TileMoveStep, GameStep } from '../../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../../actions';
import { openDialog } from '../../actions/DialogActions';
import TileBackground from './TileBackground';
import { TILE_PATH_BOARD, TILE_STROKE, BOARD_ROTATION, TILE_SIZE, DEBUG } from '../../config';
import { AppState } from '../../types/StateTypes';
import { DialogType } from '../../types/DialogTypes';
import { selectBoardTile, selectTileFromForSwap, selectTileToForSwap, selectBoardTileToMoveTo } from '../../actions/GameActions';
import { getHandTiles, isGameOver } from '../../selectors';
import { getPositionInHexagon, isGroundHandTile } from '../../lib';
import TileIcon from './CastePiece';

interface OwnProps {
    id: number,
    position: Coordinates2D,
    castes: Caste[],
    isClosed: boolean,
    isWater: boolean,
    isSwap: boolean,
}

interface StateProps {
    step: GameStep,
    isSelected: boolean,
    isPlayable: boolean,
}

interface DispatchProps {
    openTileChoiceDialog: () => void,
    openCasteChoiceDialog: () => void,
    openTileMoveEndDialog: () => void,
    selectBoardTile: () => void,
    selectTileFromForSwap: () => void,
    selectTileToForSwap: () => void,
    selectBoardTileToMoveTo: () => void,
}

type Props = OwnProps & StateProps & DispatchProps;

interface State {
    isHovered: boolean,
}

class BoardTileComponent extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            isHovered: false,
        };
    }

    handleMouseEnter = (e: React.MouseEvent) => {
        this.setState({
            isHovered: true,
        });
    }

    handleMouseLeave = (e: React.MouseEvent) => {
        this.setState({
            isHovered: false,
        });
    }

    handleClick = (e: React.MouseEvent) => {
        const { step, isPlayable, openTileChoiceDialog, openCasteChoiceDialog, openTileMoveEndDialog, selectBoardTile, selectTileFromForSwap, selectTileToForSwap, selectBoardTileToMoveTo } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            switch (step) {
                case TilePlayStep.ChooseBoardTile:
                    selectBoardTile();
                    openTileChoiceDialog();
                    return;
                case CasteSwapStep.ChooseTileFrom:
                    selectTileFromForSwap();
                    openCasteChoiceDialog();
                    return;
                case CasteSwapStep.ChooseTileTo:
                    selectTileToForSwap();
                    openCasteChoiceDialog();
                    return;
                case TileMoveStep.ChooseBoardTile:
                    selectBoardTileToMoveTo();
                    openTileMoveEndDialog();
                    return;
            }
        }
    }

    render() {
        const { id, position, castes, isClosed, isWater, isPlayable, isSelected, isSwap } = this.props;
        const { isHovered } = this.state;
        const { width, height } = TILE_SIZE;
        const center = { x: width / 2, y: height / 2 };
        const pieceSize = { width: width / 3, height: height / 3};
        const isCity = castes.length > 0;
    
        return (
            <g
                className={`
                    board-tile-component
                    ${isHovered ? 'is-hovered' : ''}
                    ${isPlayable ? 'is-playable' : ''}
                    ${isSelected ? 'is-selected' : ''}
                    ${isCity ? 'is-city' : ''}
                    ${isClosed ? 'is-closed' : ''}
                    ${isSwap ? 'is-swap' : ''}
                `}
                transform={`translate(${position.x},${position.y})`}
                onClick={this.handleClick}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                <TileBackground
                    path={TILE_PATH_BOARD}
                    stroke={TILE_STROKE}
                    isWater={isWater}
                />
                {DEBUG &&
                    <g>
                        <text x={100} y={75} className='tile-id'>
                            {id}
                        </text>
                    </g>
                }
                {isCity &&
                    <g
                        className='board-tile-component-content'
                        transform={`rotate(${-BOARD_ROTATION} ${center.x} ${center.y})`}
                    >
                        {castes.map((type: Caste, index: number) => {
                            const position = getPositionInHexagon(index, castes.length, TILE_SIZE);

                            return (
                                <TileIcon
                                    key={`caste-piece-caste-${index}`}
                                    position={position}
                                    size={pieceSize}
                                    type={type}
                                />
                            );
                        })}
                    </g>
                }
            </g>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { id, castes, isClosed, isWater, isSwap } = ownProps;
    const { self } = state.players;
    const { step, selection } = state.game;
    
    // Playability
    const isOver = isGameOver(state.players);
    const isCity = castes.length > 0;
    let isPlayable = false;

    const hasShipInHand = getHandTiles(state).some(tile => tile.type === Figure.Ship);
    const hasGroundTileInHand = getHandTiles(state).some(tile => isGroundHandTile(tile));

    const isSelectedForPlay = id === selection.play.boardTile;
    const isSelectedForMove = id === selection.move.to;
    const isSelectedForSwap = (id === selection.swap.from.tile) || (id === selection.swap.to.tile);

    switch (step) {
        case TilePlayStep.ChooseBoardTile:
            isPlayable = !isOver && self.isPlaying && !isSelectedForPlay && !isSwap && !isCity && ((isWater && hasShipInHand) || (!isWater && hasGroundTileInHand));
            break;
        case CasteSwapStep.ChooseTileFrom:
        case CasteSwapStep.ChooseTileTo:
            isPlayable = !isOver && self.isPlaying && !isSelectedForSwap && !isSwap && isCity && !isClosed;
            break;
        case TileMoveStep.ChooseBoardTile:
            isPlayable = !isOver && self.isPlaying && !isSelectedForMove && !isSwap && !isCity && !isWater;
            break;
    }

    return {
        step,
        isPlayable,
        isSelected: isSelectedForPlay || isSelectedForMove || isSelectedForSwap,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { id } = ownProps;

    return {
        selectBoardTile: () => dispatch(selectBoardTile(id)),
        selectTileFromForSwap: () => dispatch(selectTileFromForSwap(id)),
        selectTileToForSwap: () => dispatch(selectTileToForSwap(id)),
        selectBoardTileToMoveTo: () => dispatch(selectBoardTileToMoveTo(id)),
        openTileChoiceDialog: () => dispatch(openDialog(DialogType.TileChoice)),
        openCasteChoiceDialog: () => dispatch(openDialog(DialogType.CasteChoice)),
        openTileMoveEndDialog: () => dispatch(openDialog(DialogType.TileMoveEnd)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileComponent);