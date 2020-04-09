import React, { Dispatch } from 'react';
import './DialogTileMoveEnd.scss';
import Dialog from './Dialog';
import { DialogType } from '../../types/DialogTypes';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { endTurn } from '../../actions/GameActions';
import Hand from '../Hand';
import { AppState } from '../../types/StateTypes';

interface StateProps {
    hand: number[],
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

    render() {
        const { hand } = this.props;
        
        return (
            <Dialog
                type={DialogType.TileMoveEnd}
                headline='Tile Move Confirmation'
                description='Are you sure you want to move the following tile?'
                actionButtonText='Confirm'
                cancelButtonText='Cancel Move'
                onAction={this.handleAction}
                onCancel={this.handleCancel}
                isActionButtonActive
            >
                {hand && <Hand inDialog={DialogType.TileMoveEnd} />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { player } = state;

    return {
        hand: player.hand,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    endTurn: () => dispatch(endTurn),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileMoveEnd);