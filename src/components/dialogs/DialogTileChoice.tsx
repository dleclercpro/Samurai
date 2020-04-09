import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectBoardTile, endTurn } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';
import { TilePlayStep } from '../../types/GameTypes';

interface StateProps {
    hand: number[],
    isActionButtonActive: boolean,
}

interface DispatchProps {
    endTurn: () => void,
    deselectBoardTile: () => void,
}

type Props = StateProps & DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleAction = () => {
        const { endTurn } = this.props;

        alert('Tile choice will now be sent to server.');

        endTurn();
    }

    render() {
        const { hand, isActionButtonActive, deselectBoardTile } = this.props;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                description='Choose which tile to place on the empty space you just clicked:'
                actionButtonText='Choose'
                onCancel={deselectBoardTile}
                onAction={this.handleAction}
                isActionButtonActive={isActionButtonActive}
            >
                {hand && <Hand inDialog={DialogType.TileChoice} />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, player } = state;
    const { step } = game;

    const isActionButtonActive = step === TilePlayStep.Done;

    return {
        hand: player.hand,
        isActionButtonActive,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    endTurn: () => dispatch(endTurn),
    deselectBoardTile: () => dispatch(deselectBoardTile),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);