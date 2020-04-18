import React, { Dispatch } from 'react';
import { connect } from 'react-redux';
import { Coordinates2D, Caste, Figure, CasteSwitchStep, TilePlayStep, TileMoveStep, GameStep } from '../../types/GameTypes';
import './BoardTileComponent.scss';
import { AppAction } from '../../actions';
import { openDialog } from '../../actions/DialogActions';
import TileBackground from './TileBackground';
import { TILE_PATH_BOARD, TILE_STROKE, BOARD_ROTATION, TILE_SIZE } from '../../config';
import { AppState } from '../../types/StateTypes';
import { DialogType } from '../../types/DialogTypes';
import { selectBoardTile, selectTileFromForSwitch, selectTileToForSwitch, selectBoardTileToMoveTo } from '../../actions/GameActions';
import { getHand } from '../../selectors';
import { getPositionInHexagon } from '../../lib';
import TileIcon from './TileIcon';

interface OwnProps {
    id: number,
    position: Coordinates2D,
    castes: Caste[],
    isWater?: boolean,
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
    selectTileFromForSwitch: () => void,
    selectTileToForSwitch: () => void,
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
        const { step, isPlayable, openTileChoiceDialog, openCasteChoiceDialog, openTileMoveEndDialog, selectBoardTile, selectTileFromForSwitch, selectTileToForSwitch, selectBoardTileToMoveTo } = this.props;

        e.stopPropagation();

        if (isPlayable) {
            switch (step) {
                case TilePlayStep.ChooseBoardTile:
                    selectBoardTile();
                    openTileChoiceDialog();
                    return;
                case CasteSwitchStep.ChooseTileFrom:
                    selectTileFromForSwitch();
                    openCasteChoiceDialog();
                    return;
                case CasteSwitchStep.ChooseTileTo:
                    selectTileToForSwitch();
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
        const { position, castes, isWater, isPlayable } = this.props;
        const { isHovered } = this.state;
        const { width, height } = TILE_SIZE;
        const center = { x: width / 2, y: height / 2 };
        const pieceSize = { width: width / 3, height: height / 3};
    
        return (
            <g
                className={`
                    board-tile-component
                    ${isHovered ? 'is-hovered' : ''}
                    ${isPlayable ? 'is-playable' : ''}
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
                {castes.length > 0 &&
                    <g
                        className='board-tile-component-content'
                        transform={`rotate(${-BOARD_ROTATION} ${center.x} ${center.y})`}
                    >
                        {castes.map((type: Caste, index: number) => {
                            const position = getPositionInHexagon(index, castes.length, TILE_SIZE);

                            return (
                                <TileIcon
                                    key={`tile-icon-caste-${index}`}
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
    const { self} = state.player;
    const { step, selection } = state.game;
    const { id, castes, isWater } = ownProps;

    const isSelected = ownProps.id === selection.play.boardTile;
    const isSelectedForSwitch = (id === selection.switch.from.tile) || (id === selection.switch.to.tile);
    const isCity = castes.length > 0;
    const hasShipInHand = getHand(state).some(tile => tile.type === Figure.Ship);
    
    // Playability
    let isPlayable = false;

    switch (step) {
        case TilePlayStep.ChooseBoardTile:
            isPlayable = self.isPlaying && !isCity && (!isWater || hasShipInHand);
            break;
        case CasteSwitchStep.ChooseTileFrom:
        case CasteSwitchStep.ChooseTileTo:
            isPlayable = self.isPlaying && isCity && !isSelectedForSwitch;
            break;
        case TileMoveStep.ChooseBoardTile:
            isPlayable = self.isPlaying && !isCity && !isWater;
            break;
    }

    return {
        step,
        isSelected,
        isPlayable,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>, ownProps: OwnProps) => {
    const { id } = ownProps;

    return {
        selectBoardTile: () => dispatch(selectBoardTile(id)),
        selectTileFromForSwitch: () => dispatch(selectTileFromForSwitch(id)),
        selectTileToForSwitch: () => dispatch(selectTileToForSwitch(id)),
        selectBoardTileToMoveTo: () => dispatch(selectBoardTileToMoveTo(id)),
        openTileChoiceDialog: () => dispatch(openDialog(DialogType.TileChoice)),
        openCasteChoiceDialog: () => dispatch(openDialog(DialogType.CasteChoice)),
        openTileMoveEndDialog: () => dispatch(openDialog(DialogType.TileMoveEnd)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardTileComponent);