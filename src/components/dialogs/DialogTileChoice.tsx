import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectPlayerTile, deselectBoardTile } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import { AppState } from '../../types/StateTypes';

interface StateProps {
    hand: number[],
    isActionButtonActive: boolean,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectPlayerTile: () => void,
}

type Props = StateProps & DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleCancel = () => {
        const { deselectBoardTile, deselectPlayerTile } = this.props;

        deselectBoardTile();
        deselectPlayerTile();
    }

    render() {
        const { hand, isActionButtonActive } = this.props;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                description='Choose which tile to place on the empty space you just clicked:'
                actionButtonText='Choose'
                onCancel={this.handleCancel}
                onAction={() => {}}
                isActionButtonActive={isActionButtonActive}
            >
                {hand && <Hand inDialog />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, player } = state;
    const { selected } = game;

    return {
        hand: player.hand,
        isActionButtonActive: selected.playerTile !== -1 && selected.boardTile !== -1,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);