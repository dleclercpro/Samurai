import React, { Dispatch } from 'react';
import './DialogTileChoice.scss';
import Dialog from './Dialog';
import Hand from '../Hand';
import { connect } from 'react-redux';
import { AppAction } from '../../actions';
import { deselectPlayerTile, deselectBoardTile } from '../../actions/GameActions';
import { DialogType } from '../../types/DialogTypes';
import Button from '../Button';
import { AppState } from '../../types/StateTypes';

interface StateProps {
    hand: number[],
    isButtonActive: boolean,
}

interface DispatchProps {
    deselectBoardTile: () => void,
    deselectPlayerTile: () => void,
}

type Props = StateProps & DispatchProps;

class DialogTileChoice extends React.Component<Props, {}> {

    handleClose = () => {
        const { deselectBoardTile, deselectPlayerTile } = this.props;

        deselectBoardTile();
        deselectPlayerTile();
    }

    getActionButton = () => {
        const { isButtonActive } = this.props;

        return (
            <Button isActive={isButtonActive} action={() => {}}>Choose</Button>
        );
    }

    render() {
        const { hand } = this.props;

        return (
            <Dialog
                type={DialogType.TileChoice}
                headline='Tile Choice'
                description='Choose which tile to place on the empty space you just clicked:'
                onClose={this.handleClose}
                actionButton={this.getActionButton()}
            >
                {hand && <Hand inDialog />}
            </Dialog>
        );
    }
}

const mapStateToProps = (state: AppState) => {
    const { game, player } = state;

    return {
        hand: player.hand,
        isButtonActive: game.selectedPlayerTile !== -1 && game.selectedBoardTile !== -1,
    }
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => ({
    deselectBoardTile: () => dispatch(deselectBoardTile),
    deselectPlayerTile: () => dispatch(deselectPlayerTile),
});

export default connect(mapStateToProps, mapDispatchToProps)(DialogTileChoice);