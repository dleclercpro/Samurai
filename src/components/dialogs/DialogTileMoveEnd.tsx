import React, { Dispatch, ReactNode } from 'react';
import './DialogTileMoveEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endTurn } from '../../actions/GameActions';
import { AppState } from '../../types/StateTypes';
import HandTileComponent from '../tiles/HandTileComponent';
import { PlayerColor, PlayerTile } from '../../types/GameTypes';
import { NoPlayerTile } from '../../constants';

interface StateProps {
    color: PlayerColor,
    movingTile: PlayerTile,
}

interface DispatchProps {
    endTurn: () => void,
}

type Props = StateProps & DispatchProps;

class DialogTileMoveEnd extends React.Component<Props, {}> {

    handleCancel = () => {
        const { endTurn } = this.props;

        alert('Tile move was canceled altogether.');

        endTurn();
    }

    handleAction = () => {
        const { endTurn } = this.props;

        alert('Tile move will now be sent to server.');
        
        endTurn();
    }

    getMovingTile = (): ReactNode => {
        const { color, movingTile } = this.props;

        if (movingTile === NoPlayerTile) {
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
                isActionButtonActive
            >
                {this.getMovingTile()}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, player, data } = state;
    const { selection } = game;
    const { self } = player;
    const { initHand } = data;

    return {
        color: self.color,
        movingTile: initHand.get(selection.move.from) || NoPlayerTile,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    endTurn: () => dispatch(endTurn),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileMoveEnd);