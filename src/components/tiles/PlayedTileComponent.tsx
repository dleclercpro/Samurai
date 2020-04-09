import React from 'react';
import { PlayerColor, TileType, Coordinates2D, Caste, Figure, TileMoveStep, GameStep } from '../../types/GameTypes';
import './PlayedTileComponent.scss';
import { TILE_SIZE } from '../../config';
import TileComponent from './TileComponent';
import { connect } from 'react-redux';
import { AppState } from '../../types/StateTypes';

interface OwnProps {
    id: number,
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
}

type Props = OwnProps & StateProps;

class PlayedTileComponent extends React.Component<Props, {}> {

    handleClick = (e: React.MouseEvent) => {
        const { step, isPlayable } = this.props;

        if (isPlayable) {
            switch (step) {
                case TileMoveStep.ChoosePlayerTile:
                    // START TILE MOVE HERE
                    break;
            }
        }
    }

    render() {
        const { position, rotation, color, type, strength, canReplay, isPlayable } = this.props;
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
                <TileComponent
                    color={color}
                    type={type}
                    strength={strength}
                    canReplay={canReplay}
                    isPlayable={isPlayable}
                />
            </g>
        );
    }
}

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
    const { step } = state.game;
    const { type } = ownProps;

    const isMovable = [ Caste.Military, Caste.Religion, Caste.Commerce, Figure.Samurai ].some(tileType => type === tileType);
    const isPlayable = (step === TileMoveStep.ChoosePlayerTile) && isMovable;

    return {
        step,
        isPlayable,
    };
}

export default connect(mapStateToProps, () => ({}))(PlayedTileComponent);