import React, { ReactNode } from 'react';
import './DialogTileMoveEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { AppState } from '../../types/StateTypes';
import HandTileComponent from '../tiles/HandTileComponent';
import { PlayerColor, PlayerTileMap } from '../../types/GameTypes';
import { moveTile, refreshGame } from '../../actions/ServerActions';
import { ThunkDispatch } from 'redux-thunk';
import { endTurn } from '../../actions/GameActions';

interface StateProps {
    from: number,
    to: number,
    color: PlayerColor,
    initHand: PlayerTileMap,
}

interface DispatchProps {
    endTurn: () => void,

    moveTile: (boardTileFrom: number, boardTileTo: number) => Promise<any>,
    refreshGame: () => Promise<void>,
}

type Props = StateProps & DispatchProps;

class DialogTileMoveEnd extends React.Component<Props, {}> {

    handleCancel = () => {
        const { endTurn } = this.props;

        endTurn();
    }

    handleAction = () => {
        const { from, to, moveTile } = this.props;

        return moveTile(from, to);
    }

    handleClose = () => {
        const { refreshGame } = this.props;

        refreshGame();
    }

    getMovingTile = (): ReactNode => {
        const { color, initHand, from } = this.props;
        const movingTile = initHand.get(from);

        if (movingTile === undefined) {
            return null;
        }

        const { id, type, strength, canReplay } = movingTile;

        return (
            <HandTileComponent
                key={`hand-tile-component-${id}--dialog-tile-move-end`}
                id={id}
                color={color}
                type={type}
                strength={strength}
                canReplay={canReplay}
                isInDialog
            />
        );
    }

    render() {
        return (
            <Dialog
                type={DialogType.TileMoveEnd}
                headline='Tile Move Confirmation'
                message='Are you sure you want to move the following tile?'
                actionButtonText='Confirm'
                cancelButtonText='Cancel Move'
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                onClose={this.handleClose}
                isActionButtonActive
                shouldCloseAfterAction
            >
                {this.getMovingTile()}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { self } = state.players;
    const { selection } = state.game;
    const { initHand } = state.data;

    return {
        from: selection.move.from,
        to: selection.move.to,
        color: self.color,
        initHand,
    }
};

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, Promise<void>, AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    moveTile: (boardTileFrom: number, boardTileTo: number) => dispatch(moveTile(boardTileFrom, boardTileTo)),
    refreshGame: () => dispatch(refreshGame()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileMoveEnd);